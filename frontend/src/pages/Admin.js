// src/pages/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Admin = () => {
    const navigate = useNavigate();
    const [editingCafe, setEditingCafe] = useState(null);

    const [cafes, setCafes] = useState([]);
    const [newCafe, setNewCafe] = useState({ name: '', totalTables: 0 });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (!token || userRole !== 'admin') {
            navigate('/login');
        } else {
            fetchCafes();
        }
    }, []);

    const handleUpdateCafe = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/cafes/${editingCafe._id}`, editingCafe);
            setEditingCafe(null);
            fetchCafes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCafe = async (id) => {
        if (window.confirm('Are you sure you want to delete this café?')) {
            try {
                await axios.delete(`http://localhost:5000/api/cafes/${id}`);
                fetchCafes();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const fetchCafes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cafes');
            setCafes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setNewCafe({ ...newCafe, [e.target.name]: e.target.value });
    };

    const handleAddCafe = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/cafes', newCafe);
            setNewCafe({ name: '', totalTables: 0 });
            fetchCafes();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">☕ Cafe Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('role');
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <Container className="py-5">
            <h2 className="text-center mb-5">🛠️ Admin Panel - Manage Cafés</h2>

            <Card className="p-4 shadow-sm mb-5">
                <h4 className="mb-3">➕ Add New Café</h4>
                <Form onSubmit={editingCafe ? handleUpdateCafe : handleAddCafe}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Café Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Brew Haven"
                                    value={editingCafe ? editingCafe.name : newCafe.name}
                                    onChange={(e) => {
                                        editingCafe
                                            ? setEditingCafe({ ...editingCafe, name: e.target.value })
                                            : handleChange(e);
                                    }}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Total Tables</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="totalTables"
                                    placeholder="e.g. 15"
                                    value={editingCafe ? editingCafe.totalTables : newCafe.totalTables}
                                    onChange={(e) => {
                                        editingCafe
                                            ? setEditingCafe({ ...editingCafe, totalTables: e.target.value })
                                            : handleChange(e);
                                    }}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant={editingCafe ? "warning" : "primary"} type="submit" className="me-2">
                        {editingCafe ? 'Update Café' : 'Add Café'}
                    </Button>
                    {editingCafe && (
                        <Button variant="secondary" onClick={() => setEditingCafe(null)}>
                            Cancel
                        </Button>
                    )}
                </Form>
            </Card>

            <Card className="p-4 shadow-sm">
                <h4 className="mb-3">📋 Existing Cafés</h4>
                {cafes.length === 0 ? (
                    <p>No cafés added yet.</p>
                ) : (
                    <Table striped bordered hover responsive className="text-center">
                        <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Total Tables</th>
                            <th>Reserved</th>
                            <th>Available</th>
                            <th>Booked Tables</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cafes.map((cafe, idx) => {
                            console.log(cafe.reservedTables)
                            return (
                                <tr key={idx}>
                                    <td>{cafe.name}</td>
                                    <td>{cafe.totalTables}</td>
                                    <td>{cafe.reservedCount}</td>
                                    <td>{cafe.totalTables - cafe.reservedCount}</td>
                                    <td>{cafe.reservedTables.filter(t => t !== 0).join(', ') || 'None'}</td>
                                    <td>
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => setEditingCafe(cafe)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteCafe(cafe._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>

                    </Table>

                )}
            </Card>
        </Container>
        </>
    );
};

export default Admin;

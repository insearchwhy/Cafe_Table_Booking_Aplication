// src/pages/Landing.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCoffee, FaChair } from 'react-icons/fa';
import axios from 'axios';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const [cafes, setCafes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCafe, setSelectedCafe] = useState(null);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchCafes();
    }, []);

    const fetchCafes = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cafes`);
            setCafes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTableClick = async (tableNumber) => {
        if (!selectedCafe || selectedCafe.reservedTables.includes(tableNumber)) return;

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/cafes/book`, {
                cafeId: selectedCafe._id,
                tableNumber
            });
            alert(res.data.message);
            const updatedCafe = await axios.get(`${process.env.REACT_APP_API_URL}/api/cafes/${selectedCafe._id}`);
            setSelectedCafe(updatedCafe.data);
            fetchCafes();
        } catch (err) {
            console.error(err);
            alert('Booking failed.');
        }
    };

    const filteredCafes = cafes.filter(cafe =>
        cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCafe = async (cafe) => {
        try {
            const updatedCafe = await axios.get(`${process.env.REACT_APP_API_URL}/api/cafes/${cafe._id}`);
            setSelectedCafe(updatedCafe.data);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="landing-page bg-light min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning px-4 shadow-sm">
                <span className="navbar-brand fw-bold text-white">
                    <FaCoffee className="me-2" /> Café Booker
                </span>
                <button className="btn btn-outline-light ms-auto fw-bold" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Logout
                </button>
            </nav>

            <div className="container py-5">
                <div className="text-center mb-4">
                    <h1 className="fw-bold display-5">Find Your Café</h1>
                    <p className="lead">Search for the best cafés and book your favorite table instantly.</p>
                </div>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Search for a café..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    {filteredCafes.length === 0 ? (
                        <p className="text-center text-muted">No cafés found.</p>
                    ) : (
                        filteredCafes.map((cafe, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{cafe.name}</h5>
                                        <p className="card-text">
                                            <FaChair className="me-2 text-warning" />
                                            Total Tables: {cafe.totalTables}
                                        </p>
                                        <p className="card-text text-success">
                                            Available: {cafe.totalTables -  cafe.reservedTables.filter(t => t !== 0).length}
                                        </p>
                                        <button
                                            className="btn btn-outline-warning w-100 fw-bold"
                                            onClick={() => handleSelectCafe(cafe)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {selectedCafe && (
                    <div className="mt-5">
                        <h4 className="fw-bold mb-3">Click a Table to Book at {selectedCafe.name}</h4>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            {Array.from({ length: selectedCafe.totalTables }, (_, i) => {
                                const tableNumber = i + 1;
                                const isReserved = selectedCafe.reservedTables.includes(tableNumber);
                                return (
                                    <div
                                        key={tableNumber}
                                        className={`table-box border rounded p-3 text-center ${isReserved ? 'bg-success text-white' : 'bg-light'}`}
                                        style={{ width: '80px', height: '80px', cursor: isReserved ? 'not-allowed' : 'pointer' }}
                                        onClick={() => handleTableClick(tableNumber)}
                                    >
                                        Table {tableNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;

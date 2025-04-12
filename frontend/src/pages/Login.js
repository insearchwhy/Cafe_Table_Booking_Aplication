import React, {useState} from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import { FaCoffee } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);

            window.location.href = "/"
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="text-center mb-4">
                    <FaCoffee className="text-warning" size={40} />
                    <h2 className="fw-bold mt-2">Café Login</h2>
                </div>
                {error && <div className="alert alert-danger text-center py-1">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 fw-bold">
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
        if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Valid 10-digit phone is required';
        if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, form);
            window.location.href = '/login';
        } catch (err) {
            setErrors({ general: 'Registration failed' });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg" style={{ width: '420px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="text-center mb-3">
                    <FaUserPlus className="text-success" size={40} />
                    <h2 className="fw-bold mt-2">Register</h2>
                </div>
                {errors.general && <div className="alert alert-danger text-center py-1">{errors.general}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-2">
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-2">
                        <input
                            type="number"
                            name="phone"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            onInput={(e) => {
                                if (e.target.value.length > 10) {
                                    e.target.value = e.target.value.slice(0, 10);
                                }
                            }}
                        />

                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 fw-bold mt-2">
                        Register
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;

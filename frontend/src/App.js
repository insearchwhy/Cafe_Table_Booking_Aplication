import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";


const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Landing /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />

            </Routes>
        </Router>
    );
};

export default App;

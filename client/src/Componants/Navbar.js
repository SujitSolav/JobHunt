import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (    
        <nav className="navbar">
            <div className="navbar-brand">JobHunt</div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <a href="/" className="navbar-item">Home</a>
                <a href="/about" className="navbar-item">About</a>
                <a href="/admin" className="navbar-item">Profile</a>
                <a href="/contact" className="navbar-item">Contact</a>
                <div className="navbar-buttons">
                    <a href="/login" className="navbar-button">Login</a>
                    <a href="/register" className="navbar-button">Signup</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

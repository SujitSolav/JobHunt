import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#careers">Careers</a></li>
                        <li><a href="#press">Press</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#jobs">Jobs</a></li>
                        <li><a href="#internships">Internships</a></li>
                        <li><a href="#companies">Companies</a></li>
                        <li><a href="#salaries">Salaries</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <ul className="footer-socials">
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#twitter">Twitter</a></li>
                        <li><a href="#linkedin">LinkedIn</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Register.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        try {
            const res= await axios.post('http://127.0.0.1:3002/api/user/register', formData)
            if(res.data.success){
                toast.success(res.data.messsage);
                navigate('/login');
            }
            else{
                toast.error(res.data.messsage);
            }
        } catch (error) {
            
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
                <p className="already-registered">
                    Already registered? <a href="/login" className="login-link">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

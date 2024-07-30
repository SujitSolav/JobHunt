import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res= await axios.post('http://127.0.0.1:3002/api/user/login', formData)
        // console.log(res.data.name);
        if(res.data.success){
            toast.success(res.data.message)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('email', res.data.email); 
            localStorage.setItem('name', res.data.name); 
            navigate('/jobhome');
        }
        else{
            toast.error(res.data.message)
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <p className="not-registered">
                    Not registered? <a href="/register" className="register-link">Register here</a>
                </p>
                <p className="not-registered">
                    Are U Admin? <a href="/adminLogin" className="register-link">Admin Login</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

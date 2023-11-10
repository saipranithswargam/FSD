import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import Header from '../../components/Header/Header';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = formData;

        axiosInstance.post("/patients/login", { email, password })
            .then((response) => {
                console.log('Login successful');
            })
            .catch((error) => {
                console.error('Login failed', error);
            });
    };

    return (
        <div>
            {/* <Header /> */}
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

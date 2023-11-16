import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import styles from './Login.module.css';
import Wave from "./wave.png";
import Background from "./bg.svg";
import Avatar from "./avatar.svg";
import Header from '../../components/Header/Header';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State variables for email and password
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Event handlers for input fields
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Axios request to the API
        axiosInstance.post('/patients/login', {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data);
                navigate("/", { replace: true });
                toast.success("Logged in successfully!", {
                    position: "top-right",
                });
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <>
            <Header />
            <img className={styles.wave} src={Wave} alt="wave" />
            <div className={styles.container}>
                <div className={styles.img}>
                    <img src={Background} alt="background" />
                </div>
                <div className={styles['login-content']}>
                    <form onSubmit={handleFormSubmit}>
                        <img src={Avatar} alt="avatar" />
                        <h2 className={styles.title}>Welcome</h2>
                        <div className={`${styles['input-div']} ${styles.one}`}>
                            <div className={styles.i}>
                                <i className="fas fa-user"></i>
                            </div>
                            <div className={styles.div}>
                                <input type="text" placeholder='Email' className={styles.input} value={email} onChange={handleEmailChange} />
                            </div>
                        </div>
                        <div className={`${styles['input-div']} ${styles.pass}`}>
                            <div className={styles.i}>
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className={styles.div}>
                                <input type="password" placeholder="Password" className={styles.input} value={password} onChange={handlePasswordChange} />
                            </div>
                        </div>
                        <input type="submit" className={styles.btn} value="Login" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

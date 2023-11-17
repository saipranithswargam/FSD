import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import styles from './Login.module.css';
import Wave from "./wave.png";
import Background from "./bg.svg";
import Avatar from "./avatar.svg";
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
import { userActions } from "../../features/userSlice";
const Login = () => {
    const [isInvalidEmail, setIsValidEmail] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const checkPasswordValidity = () => {
        const isValid = /^(?=.*[A-Z]).{8,}$/.test(password);
        if (!isValid) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }
    }
    const checkEmailValidity = (e) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post('/patients/login', {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data);
                dispatch(userActions.setState({ ...response.data }));
                navigate("/", { replace: true });
                toast.success("Logged in successfully!", {
                    position: "top-right",
                    toastId: 2,
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
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <img src={Avatar} alt="avatar" />
                        <h2 className={styles.title}>Welcome</h2>
                        <div className={`${styles['input-div']} ${styles.one}`}>
                            <div className={styles.i}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={styles.div}>
                                <input type="email" placeholder='Email' className={`${styles.input} ${isInvalidEmail ? styles.invalid : " "} `}
                                    onBlur={checkEmailValidity}
                                    onFocus={() => { setIsValidEmail(false) }}
                                    value={email} onChange={handleEmailChange} required />
                            </div>
                        </div>
                        <div className={`${styles['input-div']} ${styles.pass}`}>
                            <div className={styles.i}>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className={styles.div}>
                                <input type="password" placeholder="Password"
                                    className={`${styles.input} ${isPasswordInvalid ? styles.invalid : " "} `}
                                    value={password} onChange={handlePasswordChange} onBlur={checkPasswordValidity} onFocus={() => { setIsPasswordInvalid(false) }} />
                            </div>
                        </div>
                        <input type="submit" className={styles.btn} value="Login" />
                        <div className={styles.register}>
                            <p>Don't Have an Account ? </p>
                            <Link to={"/auth/patientsRegister"} style={{ fontSize: "1rem" }} >Register Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

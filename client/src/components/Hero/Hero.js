import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleGetStartedClick = () => {
        navigate("/auth/patientlogin"); // Navigate to the specified route
    };
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.hero__right}>
                    <div className={styles.hero__right__title}>
                        <h1>Where Compassion Meets Efficiency.</h1>
                        <p>
                            Experience the Advantages of Centralized Healthcare.
                        </p>
                        <div className={styles.buttonDiv}>
                            <button onClick={handleGetStartedClick}>
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.hero__left}></div>
            </div>
        </>
    );
};

export default Hero;

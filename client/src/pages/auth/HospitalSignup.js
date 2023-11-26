
import React, { useState } from 'react';
import styles from './HospitalSignup.module.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import Image from "./HospitalRegister2.jpg"
const HospitalSignup = () => {
    const [formData, setFormData] = useState({
        hname: '',
        regNo: '',
        email: '',
        password: '',
        speciality: 'MultiSpeciality', // Default value
        otherSpeciality: '', // Hidden field
        government: 'Yes', // Default value
        state: '',
        city: '',
        pincode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const hospitalValidation = async (e) => {
        e.preventDefault();
        console.log(formData)
        // const response = await fetch('/hospitals/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // });

        // if (response.ok) {
        //     // Handle successful form submission, e.g., redirect to a success page
        //     console.log('Form submitted successfully');
        // } else {
        //     // Handle errors during form submission
        //     console.error('Error submitting the form');
        // }
    };

    return (
        <div className={styles.main}>
            <div className={styles.imageDiv}>
                <Link to={"/"} className={styles["brand"]} >CHS</Link>
                <h4 className={styles["tagLine"]}>India's First CHR Portal</h4>
                <Tilt
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    scale={1.02}
                    transitionSpeed={2000}
                    className="parallax-tilt"
                >
                    <img alt='register__image' src={Image} />
                </Tilt>
            </div>
            <div className={styles.formDiv}>
                <h3>Ready to start Partnership with CHS ?</h3>
                <p>Complete the form below and get started:</p>

                <form action="/hospitals/register" method="post" onSubmit={hospitalValidation}>
                    <h5>Hospital Details</h5>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Hospital Name"
                            name="hname"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Registration No."
                            name="regNo"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Email"
                            name="email"
                            className={styles.fullWidth}
                            type="email"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Password"
                            name="password"
                            className={styles.fullWidth}
                            required
                            type="password"
                            id="input--password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.floatLeft}`}>
                        <label className={styles.onTop}>Speciality</label>
                        <select name="speciality" onChange={handleInputChange}>
                            <option>MultiSpeciality</option>
                            <option>Dermatology</option>
                            <option>GeneralSurgery</option>
                            <option>Gastroenterology</option>
                            <option>Oncology</option>
                            <option>Orthopaedics</option>
                            <option>ENT</option>
                            <option>ophthalmology</option>
                            <option>other</option>
                        </select>
                    </div>
                    <div className={styles.fullWidth}>
                        <input
                            placeholder="Spacify Speciality"
                            name="otherSpeciality"
                            className={styles.fullWidth}
                            type="hidden"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.floatLeft}`}>
                        <label className={styles.onTop}>Government</label>
                        <select name="government" onChange={handleInputChange} className={styles.fullWidth}>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Semi</option>
                        </select>
                    </div>
                    <h5>Address:</h5>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button className={styles.btn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalSignup;

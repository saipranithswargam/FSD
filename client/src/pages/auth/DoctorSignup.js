import React, { useState } from 'react';
import styles from './DoctorSignup.module.css';
import { Link } from 'react-router-dom';
import Image from "./DoctorRegister.svg";
import Tilt from 'react-parallax-tilt';
const DoctorSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        licenseNo: '',
        experience: '',
        specialty: '',
        state: '',
        city: '',
        pincode: '',
        mobileNum: '',
        regNo: '',
        email: '',
        password: '',
    });

    const doctorValidation = async (e) => {
        e.preventDefault();
        console.log(formData);
        //     const response = await fetch('/doctors/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });

        //     if (response.ok) {
        //         // Handle successful form submission, e.g., redirect to a success page
        //         console.log('Form submitted successfully');
        //     } else {
        //         // Handle errors during form submission
        //         console.error('Error submitting the form');
        //     }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className={styles.main}>
            <div className={styles["image-div"]}>
                <Link to={"/"} className={styles["brand"]} >CHS</Link>
                <h4 className={styles["tag-line"]}>India's First CHR Portal</h4>
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
            <div className={styles["form-div"]}>
                <h3>Ready to get started with CHS ?</h3>
                <p>Join us by filling the following form</p>
                <form onSubmit={doctorValidation}>
                    <h5>Personal Details</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="Name"
                            name="name"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Age"
                            name="age"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles["input-group"]} ${styles["float-left"]}`}>
                        <label className="on-top">
                            Gender:
                            <select
                                name="gender"
                                onChange={handleInputChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>

                    <h5>Practice Details:</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="License No"
                            name="licenseNo"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Experience"
                            name="experience"
                            type="number"
                            min="0"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles["input-group"]} ${styles["float-left"]}`}>
                        <label className={styles["on-top"]}>Specialty</label>
                        <select name="specialty" onChange={handleInputChange}>
                            <option>Dermatologist</option>
                            <option>Gastroenterologist</option>
                            <option>Oncologist</option>
                            <option>Orthopedic</option>
                            <option>ENT</option>
                            <option>Ophthalmologist</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <h5>Practice Address:</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            required
                            title="please enter a 6 digit valid pincode"
                            onChange={handleInputChange}
                        />
                    </div>

                    <h5>Contact Details:</h5>
                    <div className={styles["last-details"]}>
                        <input
                            placeholder="Mobile Number"
                            name="mobileNum"
                            className="full-width"
                            pattern="^[6-9]\d{9}$"
                            title="mobile number must be of 10 digits"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Hospital Registration No."
                            name="regNo"
                            className="full-width"
                            required
                            title="Hospital Registration Number"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            id="input--email"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            id="input--password"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button type="submit" className={styles["btn"]}  >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorSignup;

import React, { useState } from 'react';
import axios from 'axios';
import styles from './DoctorSignup.module.css';

const DoctorSignup = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [licenseNo, setLicenseNo] = useState('');
    const [experience, setExperience] = useState('');
    const [speciality, setSpeciality] = useState('Dermatologist');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobileNum, setMobileNum] = useState('');
    const [regNo, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            name,
            age,
            gender,
            liscenceNo: licenseNo,
            experience,
            speciality,
            state,
            city,
            pincode,
            mobileNum,
            regNo,
            email,
            password,
            confirmPassword,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/doctors/register', data);

            // Handle the response as needed
            console.log('Doctor Registration Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Doctor Registration Error', error);
            setErrorMessage('Registration failed. Please check the provided information.');
        }
    };

    return (
        <div className={styles.main}>
            <div id="bg"></div>
            <div className={styles['form-div']}>
                <h3>Ready to get started with CHS?</h3>
                <p>Join us by filling the following form</p>
                <form
                    action="/doctors/register"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <h5>Personal Details</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder="Age"
                            name="age"
                            required
                            type="number"
                            min="0"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['on-top']}>Gender:</label>
                        <select
                            name="gender"
                            aria-placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <h5>Practice Details:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="License No"
                            name="licenseNo"
                            required
                            type="text"
                            value={licenseNo}
                            onChange={(e) => setLicenseNo(e.target.value)}
                        />
                        <input
                            placeholder="Experience"
                            name="experience"
                            type="number"
                            min="0"
                            required
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['on-top']}>Speciality</label>
                        <select
                            name="speciality"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                        >
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
                    <div className={styles['input-group']}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            required
                            title="Please enter a 6-digit valid pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <h5>Contact Details:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Mobile Number"
                            name="mobileNum"
                            className={styles['full-width']}
                            pattern="^[6-9]\d{9}$"
                            title="Mobile number must be 10 digits"
                            required
                            value={mobileNum}
                            onChange={(e) => setMobileNum(e.target.value)}
                        />
                    </div>
                    <div className={styles['last-details']}>
                        <input
                            placeholder="Hospital Registration No."
                            name="regNo"
                            className={styles['full-width']}
                            required
                            title="Hospital Registration Number"
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                        />
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            id="input--email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            id="input--password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className={styles['errorParas']}>
                            <p id="emailErrorPara" className={styles['invalid']}></p>
                            <p id="passwordErrorPara" className={styles['invalid']}></p>
                            <p id="confirmPassError" className={styles['invalid']}></p>
                            {errorMessage && <p className={styles['invalid']}>{errorMessage}</p>}
                        </div>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorSignup;

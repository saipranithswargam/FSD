import React, { useState } from 'react';
import axios from 'axios';
import styles from './PatientSignupStyles.module.css';

const PatientSignup = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('yes');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [allergies, setAllergies] = useState('');
    const [bloodGroup, setBloodGroup] = useState('A Positive');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            name,
            gender,
            age,
            maritalStatus,
            height,
            weight,
            allergies,
            bloodGroup,
            state,
            city,
            pincode,
            mobileNumber,
            emergencyContact,
            email,
            password,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/patients/register', data);

            // Handle the response as needed
            console.log('Patient Registration Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Patient Registration Error', error);
            setErrorMessage('Registration failed. Please check your information.');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles['image-div']}>
                <h1 className={styles.brand}>CHS</h1>
                <h4 className={styles['tag-line']}>India's First CHR Portal</h4>
            </div>
            <div className={styles['form-div']}>
                <h3>Ready to get started with CHS ?</h3>
                <p>Complete the form below and get started:</p>
                <form action="/api/patients/register" method="post" onSubmit={handleSubmit}>
                    <h5>Personal Details</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>
                            Gender:
                            <select
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Age"
                            name="age"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <label>
                            Married:
                            <select
                                name="maritalStatus"
                                value={maritalStatus}
                                onChange={(e) => setMaritalStatus(e.target.value)}
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>
                    </div>
                    <h5>Medical Details:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Height"
                            name="height"
                            required
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <input
                            placeholder="Weight"
                            name="weight"
                            required
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Allergies Enter ',' separated"
                            name="allergies"
                            className={styles['full-width']}
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['on-top']}>Blood Group:</label>
                        <select
                            name="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                        >
                            <option>A Positive</option>
                            <option>A Negative</option>
                            <option>B Positive</option>
                            <option>B Negative</option>
                            <option>AB Positive</option>
                            <option>AB Negative</option>
                            <option>O Positive</option>
                            <option>O Negative</option>
                        </select>
                    </div>
                    <h5>Address:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <h5>Contact Details:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Mobile Number"
                            name="mobileNumber"
                            required
                            pattern="^[6-9]\d{9}$"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <input
                            placeholder="Emergency Contact"
                            name="emergencyContact"
                            required
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)}
                        />
                    </div>
                    <div className={styles['last-details']}>
                        <input
                            placeholder="Email"
                            name="email"
                            required
                            id="input--email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            required
                            type="password"
                            id="input--password"
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
                    </div>
                    <div className={styles['errorParas']}>
                        <p id="emailErrorPara" className="invalid"></p>
                        <p id="passwordErrorPara" className="invalid"></p>
                        <p id="confirmPassError" className="invalid"></p>
                        {errorMessage && <p className="invalid">{errorMessage}</p>}
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientSignup;

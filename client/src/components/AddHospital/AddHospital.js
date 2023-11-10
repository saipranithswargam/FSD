import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddHospital.module.css';

const AddHospital = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalRegNo, setHospitalRegNo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            hname: hospitalName,
            regNo: hospitalRegNo,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/doctors/addhospital', data);

            // Handle the response as needed
            console.log('Add Hospital Request Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Error adding hospital', error);
            setErrorMessage('An error occurred while adding the hospital.');
        }
    };

    return (
        <div className={styles.mainDiv}>
            <h1>Add Hospital</h1>
            <form method="post" action="/doctors/addhospital" onSubmit={handleSubmit}>
                <input
                    name="hname"
                    placeholder="Hospital Name"
                    className={styles.name}
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                />
                <input
                    name="regNo"
                    placeholder="Hospital RegNo."
                    className={styles.regNo}
                    value={hospitalRegNo}
                    onChange={(e) => setHospitalRegNo(e.target.value)}
                />
                <button type="submit" className={styles.button}>
                    Add Hospital
                </button>
                {errorMessage && <p className={styles.invalid}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddHospital;

import React, { useState } from 'react';
import axios from 'axios';
import styles from './RemoveHospitalStyles.module.css'; // Import your CSS styles

const RemoveHospital = () => {
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
            const response = await axios.post('/api/doctors/removehospital', data);

            // Handle the response as needed
            console.log('Hospital Removal Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Hospital Removal Error', error);
            setErrorMessage('Hospital removal failed. Please check the information.');
        }
    };

    return (
        <div className={styles.mainDiv}>
            <h1>Remove Hospital</h1>
            <form method="post" action="/api/doctors/removehospital" onSubmit={handleSubmit}>
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
                <button type="submit">Remove Hospital</button>
                {errorMessage && <p className="invalid">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default RemoveHospital;

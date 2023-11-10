import React, { useState } from 'react';
import axios from 'axios';
import styles from './BookAppointment.module.css';

const BookAppointment = () => {
    const [hospitalId, setHospitalId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [type, setType] = useState('New Case');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            hospitalId,
            doctorId,
            appointmentDate,
            appointmentTime,
            diseaseDescription,
            type,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/appointment', data);

            // Handle the response (e.g., show a success message)
            console.log('Request successful', response);
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error sending request', error);
        }
    };

    return (
        <div className={styles.formDiv}>
            <h2>Appointment Request</h2>
            <form className={styles.bookdoctor} onSubmit={handleSubmit}>
                <input type="hidden" value={hospitalId} name="hospitalId" />
                <input type="hidden" value={doctorId} name="doctorId" />
                <div className={styles['input-group']}>
                    <label>Appointment Date</label>
                    <input
                        name="appointmentDate"
                        type="date"
                        required
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label>Appointment Time</label>
                    <input
                        name="appointmentTime"
                        type="time"
                        required
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Description of Disease"
                    name="diseaseDescription"
                    required
                    value={diseaseDescription}
                    onChange={(e) => setDiseaseDescription(e.target.value)}
                />
                <div className={styles['input-group']}>
                    <label>Type</label>
                    <select
                        name="type"
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="New Case">New Case</option>
                        <option value="Existing Case">Existing Case</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>Request Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;

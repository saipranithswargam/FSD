import React, { useEffect, useState } from 'react';

const ViewRequestedAppointements = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the API endpoint
        const apiUrl = 'http://localhost:5050/hospitals/requestedappointments'; // Adjust the URL based on your actual API endpoint

        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAppointments(data.requestedAppointments);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            });
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        <p>Appointment ID: {appointment._id}</p>
                        <p>Doctor: {appointment.doctor.name} {/* Assuming 'name' is a property of the doctor object */}</p>
                        <p>Patient: {appointment.patient.name} {/* Assuming 'name' is a property of the patient object */}</p>
                        {/* Add other fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewRequestedAppointements;

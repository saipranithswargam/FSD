import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./PatientsRequestedAppointments.module.css"
const PatientsRequestedAppointments = ({ type }) => {
    const [appointmentType, setAppointmentType] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    const submitCancleAppointment = async (appointment) => {
        console.log(appointment)
        let dataType = ''
        if (appointmentType === 'requestedappointments') {
            dataType = 'requested';
        }
        if (appointmentType === 'confirmendappointments') {
            dataType = 'confirmed';
        }
        if (dataType === '') { return ;}
        try {
            const response = await fetch('http://localhost:5050/patients/cancleRequestedAppointment', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentId: appointment._id,
                    type: dataType
                }),
            })
            if (response.ok) {
                handleCancleAppointment(appointment._id);
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    const handleCancleAppointment = (appointmentId) => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
    };

    const fetchAppointments = () => {
        const apiUrl = `http://localhost:5050/patients/${appointmentType}`;
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAppointments(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            });
    }
    useEffect(() => {
        setAppointmentType(type);
        if (appointmentType !== '') { fetchAppointments(); }
    }, [appointmentType]);

    return (
        <div>
            <div className={styles.appointmentmain}>
                {appointments.map((appointment) => (
                    <div key={appointment._id} className={styles.appointmentCard}>
                        <p>Doctor: {appointment.doctorId.name}</p>
                        <p>Hospital: {appointment.hospitalId.name}</p>
                        <p>Appointment Date: {appointment.appointmentDate}</p>
                        <p>Appointment Time: {appointment.appointmentTime} </p>
                        <div className={styles.buttonDiv}>
                            <button className={styles.btn} onClick={(e) => {
                                e.preventDefault();
                                submitCancleAppointment(appointment);
                            }}>Cancle appointment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientsRequestedAppointments;

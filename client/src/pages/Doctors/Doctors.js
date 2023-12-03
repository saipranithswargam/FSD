import React, { useEffect, useState } from 'react';
import styles from "./Doctors.module.css";
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header';

const Doctors = () => {
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const fetchData = async () => {
        try {
            const { id } = params;
            const response = await fetch(`http://localhost:5050/patients/doctorlist/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Header />
            <div className={styles.main}>
                doctorslist
            </div>
        </>
    )
}

export default Doctors
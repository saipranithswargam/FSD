import React, { useEffect, useState } from 'react';
import styles from './Doctors.module.css';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import DoctorsListCard from '../../components/DoctorListCard/DoctorsListCard';
import FetchLoader from '../../components/Loaders/fetchLoader';
import { NoData } from '../../components/NoData/NoData';
const Doctors = () => {
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = params;
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5050/patients/doctorlist/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Error fetching data. ${error.message || 'Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            {doctors.length !== 0 &&
                <div className={styles.main}>
                    {!loading && doctors.map((doctor) => (
                        <DoctorsListCard key={doctor.id} doctor={doctor} hospitalId={id} />
                    ))}
                </div>
            }
            {
                doctors.length === 0 && !loading && <NoData />
            }
            {
                loading && <FetchLoader />
            }
        </>
    );
};

export default Doctors;

import React, { useEffect, useState } from 'react'
import HospitalFilter from '../../components/HospitalFilter/HospitalFilter';
import Header from '../../components/Header/Header';
import styles from "./Hospitals.module.css";
import { useAppSelector } from '../../app/hooks';
import HospitalCard from '../../components/HospitalCard/HospitalCard';
const Hospitals = () => {
    const user = useAppSelector((state) => state.user);
    const [hospitals, setHospitals] = useState([]);
    const fetchData = async (specialityFilter, radiusFilter) => {
        try {
            const filterData = { speciality: specialityFilter, distance: radiusFilter, latitude: user.latitude, longitude: user.longitude }
            const response = await fetch(`http://localhost:5050/patients/hospitals`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const applyFilters = (specialityFilter, radiusFilter) => {
        console.log(specialityFilter, radiusFilter)
        fetchData(specialityFilter, radiusFilter);
    };
    useEffect(() => {
        fetchData('all', 5);
    }, [])
    return (<>
        <Header />
        <div className={styles.main}>
            <HospitalFilter filter={applyFilters} />
            <div className={styles.hospitalsList}>
                {hospitals.map((hospital) => (
                    <HospitalCard key={hospital._id} hospital={hospital} />
                ))}
            </div>
        </div>
    </>
    )
}

export default Hospitals
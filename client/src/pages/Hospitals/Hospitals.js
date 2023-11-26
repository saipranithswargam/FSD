import React, { useState } from 'react'
import HospitalFilter from '../../components/HospitalFilter/HospitalFilter';
import Header from '../../components/Header/Header';
import styles from "./Hospitals.module.css";
import { useAppSelector } from '../../app/hooks';
const Hospitals = () => {
    const user = useAppSelector((state) => state.user);
    const [hospitals, setHospitals] = useState([]);
    const fetchData = async (specialityFilter, locationFilter, radiusFilter) => {
        try {
            const response = await fetch(`http://localhost:5050/patients/hospitals/filtered/${locationFilter}/${specialityFilter}`,{
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                }
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
    const applyFilters = (specialityFilter, locationFilter, radiusFilter) => {
        fetchData(specialityFilter,locationFilter,radiusFilter);
    };
    useState(() => {
        fetchData('All', user.city, 5);
    }, [])
    return (<>
        <Header />
        <div className={styles.main}>
            <HospitalFilter filter={applyFilters} />
        </div>
    </>
    )
}

export default Hospitals
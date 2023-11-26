import React, { useState } from 'react';
import styles from "./HospitalFilter.module.css";
import { useAppSelector } from '../../app/hooks';
const HospitalFilter = (props) => {
    const user = useAppSelector((state) => state.user);

    const [specialityFilter, setSpecialityFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState(user.city);
    const [radiusFilter, setRadiusFilter] = useState(5);

    const handleSpecialityChange = (event) => {
        setSpecialityFilter(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocationFilter(event.target.value);
    };

    const handleRadiusChange = (event) => {
        setRadiusFilter(event.target.value);
    };

    const submitClickHandler = () => {
        props.filter(specialityFilter, locationFilter, radiusFilter);
    }


    return (
        <div className={styles.main}>
            <label>
                Filter by Speciality:
                <select value={specialityFilter} onChange={handleSpecialityChange} className={styles.input}>
                    <option>All</option>
                    <option>MultiSpeciality</option>
                    <option>Dermatology</option>
                    <option>GeneralSurgery</option>
                    <option>Gastroenterology</option>
                    <option>Oncology</option>
                    <option>Orthopaedics</option>
                    <option>ENT</option>
                    <option>ophthalmology</option>
                </select>
            </label>

            <label>
                Filter by City:
                <input className={styles.input} type="text" value={locationFilter} onChange={handleLocationChange} />
            </label>

            <label>
                Radius (in km):
                <input className={styles.input} type="number" value={radiusFilter} onChange={handleRadiusChange} />
            </label>

            <button onClick={submitClickHandler} className={styles.btn}>Apply Filters</button>
        </div>
    );
};

export default HospitalFilter;

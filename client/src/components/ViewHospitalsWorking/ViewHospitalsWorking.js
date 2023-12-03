import React, { useEffect, useState } from 'react'
import axiosInstance from "../../api/axiosInstance";
import styles from "./ViewHospitalsWorking.module.css";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddHospital from '../AddHospital/AddHospital';
const ViewHospitalsWorking = () => {
    const [showModal, setShowModal] = useState(false);
    const [hospitalsWorkingIn, setHospitalsWorkingIn] = useState([]);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const getHospitals = async () => {
        try {
            const response = await axiosInstance.get("/doctors/gethospitalsworkingfor");
            console.log(response.data);
            setHospitalsWorkingIn(response.data);
        } catch (error) {
            console.log('Error getting hospitals:', error);
        }
    };
    useEffect(() => {
        getHospitals();
    }, [])
    return (
        <div className={styles.main}>
            {
                hospitalsWorkingIn.map((hospital) => (
                    <Card key={hospital._id} className={styles.hospitalDetailsCard}>
                        <h1>{hospital.name}</h1>
                        <p className={styles.address}><span>{hospital.city}</span><span> ,</span><span>{hospital.state}</span><span> ,</span><span>{hospital.pincode}</span></p>
                        <button className={styles.btn}>Remove Hospital</button>
                    </Card>
                ))
            }
            <Card onClick={handleShowModal} style={{ width: '18rem', cursor: 'pointer', height: '18rem' }}>
                <Card.Body className={styles.cardBody}>
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                </Card.Body>
            </Card>
            <AddHospital isOpen={showModal} onClose={handleHideModal} getHospitals={getHospitals} />
        </div>
    )
}

export default ViewHospitalsWorking
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./PatientsMedicalRecords.module.css";
import DownloadPDFButton from '../DownloadPdf/DownloadPdf';

const PatientsMedicalRecords = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchMedicalRecords = () => {
        const apiUrl = `http://localhost:5050/patients/medicalrecords`;
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setMedicalRecords(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            });
    };

    const handleViewDetails = (medicalRecord) => {
        setSelectedMedicalRecord(medicalRecord);
        setShowModal(true);
    };

    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    return (
        <div>
            <div className={styles.appointmentmain}>
                {medicalRecords.map((medicalRecord) => (
                    <div key={medicalRecord._id} className={styles.appointmentCard}>
                        <p>Doctor: {medicalRecord.doctorId.name}</p>
                        <p>Hospital: {medicalRecord.hospitalId.name}</p>
                        <p>Date: {medicalRecord.date}</p>
                        <div className={styles.buttonDiv}>
                            <button
                                className={styles.btn}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleViewDetails(medicalRecord);
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for displaying details */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Medical Record Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Render details of the selectedMedicalRecord here */}
                    {selectedMedicalRecord && (
                        <div>
                            <p><span>Hospital:</span><span>{selectedMedicalRecord.hospitalId.name}</span></p>
                            <p><span>Doctor:</span><span>{selectedMedicalRecord.doctorId.name}</span></p>
                            <p><span>BloodPressure:</span><span>{selectedMedicalRecord.bloodPressure}</span></p>
                            <p><span>Temperature:</span><span>{selectedMedicalRecord.temperature}</span></p>
                            <p><span>Oxygen:</span><span>{selectedMedicalRecord.oxygen}</span></p>
                            <p><span>MedicalTests:</span><span>{selectedMedicalRecord.medicalTests}</span></p>
                            <p><span>Surgery:</span><span>{selectedMedicalRecord.surgery}</span></p>
                            <p><span>Medicines:</span><span>{selectedMedicalRecord.medicines}</span></p>
                            <p><span>Note:</span><span>{selectedMedicalRecord.note}</span></p>
                            <p><span>Date:</span><span>{selectedMedicalRecord.date}</span></p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedMedicalRecord && (
                        <DownloadPDFButton id={selectedMedicalRecord._id} />
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PatientsMedicalRecords;

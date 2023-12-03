import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./AddHospital.module.css";
const AddHospital = ({ isOpen, onClose, getHospitals }) => {
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalRegNo, setHospitalRegNo] = useState('');

    const handleSubmitAndFetchHospitals = async (e) => {
        e.preventDefault();
        console.log('Hospital Name:', hospitalName);
        console.log('Hospital RegNo:', hospitalRegNo);

        try {
            // Submit the form
            const response = await fetch('http://localhost:5050/doctors/addhospital', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hname: hospitalName,
                    regNo: hospitalRegNo,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            // Process the response data if needed
            const responseData = await response.json();

            // Fetch hospitals after successful form submission
            await getHospitals();
        } catch (error) {
            console.error('Error adding hospital:', error);
        }

        // Close the modal or perform other actions as needed
        onClose();
    };


    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title >Add Hospital</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.main}>
                <Form onSubmit={handleSubmitAndFetchHospitals} className={styles.form}>
                    <Form.Group controlId="formHospitalName">
                        <Form.Label style={{ paddingLeft: '0.5rem' }}>Hospital Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formHospitalRegNo">
                        <Form.Label style={{ paddingLeft: '0.5rem' }}>Hospital RegNo.</Form.Label>
                        <Form.Control
                            type="text"
                            value={hospitalRegNo}
                            onChange={(e) => setHospitalRegNo(e.target.value)}
                        />
                    </Form.Group>
                    <div style={{ margin: '0 auto' }}>
                        <Button variant="primary" type="submit" className={styles.btn}>
                            Add Hospital
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddHospital;

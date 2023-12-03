import React, { useEffect, useState } from 'react'
import DoctorDashboard from './DoctorDashboard'
import PatientDashboard from './PatientDashboard'
import HospitalDashboard from './HospitalDashboard'
import AdminDashboard from './AdminDashboard'
const Dashboard = (props) => {
    const [userType, setUserType] = useState('');
    useEffect(() => {
        setUserType(props.type);
    }, [])
    return (
        <>
            {userType === 'patients' && <PatientDashboard />}
            {userType === 'doctors' && <DoctorDashboard />}
            {userType === 'hospitals' && <HospitalDashboard />}
            {userType === 'admin' && <AdminDashboard />}
            
        </>
    )
}

export default Dashboard
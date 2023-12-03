import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import { ToastContainer } from "react-toastify";
import AuthProtected from "../Authprotected";
import PageLoader from "../Loaders/PageLoader";
import Login from "../../pages/auth/Login";
import { useAppSelector } from "../../app/hooks";
import Register from "../../pages/auth/PatientSignup";
import Protected from "../Protected";
import Hospitals from "../../pages/Hospitals/Hospitals";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import DoctorSignup from "../../pages/auth/DoctorSignup";
import HospitalSignup from "../../pages/auth/HospitalSignup";
import Dashboard from "../Dashboards/Dashboard";
import Doctors from "../../pages/Doctors/Doctors";
const Navigation = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/">
                    <Route path="" element={<Home />} />
                </Route>

                <Route path="/" element={<Protected />} >
                    <Route path="hospitals" element={<Hospitals />} />
                    <Route path="dashboard" element={<Dashboard type={user.type} />} />
                </Route>

                <Route path="/hospitals" element={<Protected />}>
                    <Route path=":id" element={<Doctors />} />
                </Route>
                <Route path="/auth" element={<AuthProtected />}>
                    <Route
                        path=":type"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Login />
                            </React.Suspense>
                        }
                    />
                </Route>

                <Route path="/auth">
                    <Route path="patientsregister" element={
                        <React.Suspense fallback={<PageLoader />}>
                            <Register />
                        </React.Suspense>
                    }
                    />
                    <Route path="doctorsregister" element={
                        <React.Suspense fallback={<PageLoader />}>
                            <DoctorSignup />
                        </React.Suspense>
                    }
                    />
                    <Route path="hospitalsregister" element={
                        <React.Suspense fallback={<PageLoader />}>
                            <HospitalSignup />
                        </React.Suspense>
                    }
                    />
                    <Route path="adminregister" element={<PageNotFound />} />
                </Route>

                <Route path="/page-not-found" element={<PageNotFound />} />

            </Routes>
        </>
    );
};

export default Navigation;

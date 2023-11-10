import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import AuthProtected from "../Authprotected";
import PageLoader from "../Loaders/PageLoader";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
const Navigation = () => {
    return (
        <>
            <Routes>
                <Route path="/loader" element={<PageLoader />} />
                <Route path="/auth" element={<AuthProtected />}>
                    <Route
                        path="patientlogin"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Login />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="patientsignup"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Register />
                            </React.Suspense>
                        }
                    />
                </Route>
                <Route path="/">
                    <Route path="" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
};

export default Navigation;

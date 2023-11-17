import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import { ToastContainer } from "react-toastify";
import AuthProtected from "../Authprotected";
import PageLoader from "../Loaders/PageLoader";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import MyMap from "../Map/my-map";
import Protected from "../Protected";
const Navigation = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/auth" element={<AuthProtected />}>
                    <Route
                        path="patientslogin"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Login />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="patientsRegister"
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
                <Route path="/" element={<Protected />} >
                    <Route path="hospitals" element={<MyMap />} />
                </Route>
            </Routes>
        </>
    );
};

export default Navigation;

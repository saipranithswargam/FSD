import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
const App = () => {
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5050/index", true);

        xhr.onload = () => {
            if (xhr.status === 200) {
                // Request was successful
                console.log(JSON.parse(xhr.responseText));
            } else {
                // Request failed
                console.log("error");
            }
        };

        xhr.onerror = () => {
            // Network error
            console.log("Network error");
        };
        xhr.send();
    }, []);
    return <h1>Hello</h1>;
};

export default App;

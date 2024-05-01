import axios from "axios";
const instance = axios.create({
    // baseURL: "https://fsd-shly.onrender.com",
    baseURL: "http://localhost:5050/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;

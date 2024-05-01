import axios from "axios";
const instance = axios.create({
    // baseURL: "http://localhost:5050",
    baseURL: "https://fsd-shly.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;

import axios from 'axios';

// 1. Axios Instance banana
const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Aapke backend ka base URL
});

// 2. Interceptor: Har request ke saath Token bhejne ke liye
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Browser ki memory se token uthana
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Backend ko token dena
    }
    return req;
});

export default API;
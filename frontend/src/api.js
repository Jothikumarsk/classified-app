import axios from 'axios';

const API = axios.create({ baseURL: 'https://classified-app.onrender.com/api/' });

// Attach token to request headers if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;

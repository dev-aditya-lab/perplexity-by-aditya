import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export const registerUser = async ({ username, email, password }) => { 
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;   
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const loginUser = async ({ emailOrUsername, password }) => {
    try {
        const response = await api.post('/api/auth/login', { emailOrUsername, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/getme');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const logoutUser = async () => {
    try {
        await api.post('/api/auth/logout');
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}
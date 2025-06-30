ervices/auth.service.js
import API from './api';

const login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // לשמור גם את פרטי המשתמש והתפקיד
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const getToken = () => {
    return localStorage.getItem('token');
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser,
    getToken,
};

export default authService;
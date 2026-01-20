import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("AuthProvider: Initializing, token present in localstorage?", !!token);
        if (token) {
            const storedUser = localStorage.getItem('user');
            if (storedUser && storedUser !== "undefined") {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Corrupted user data in localStorage, clearing...", error);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            } else {
                try {
                    const decoded = jwtDecode(token);
                    const userData = { id: decoded.id, email: decoded.email, name: decoded.email.split('@')[0] };
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                } catch (e) {
                    localStorage.removeItem('token');
                }
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const token = typeof response.data === 'string' ? response.data : response.data.token;

            if (!token) throw new Error("Invalid response from server");

            const decoded = jwtDecode(token);
            const userData = { id: decoded.id, email: decoded.email, name: decoded.email.split('@')[0] };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('Login Successful!');
            return true;
        } catch (error) {
            console.error("Login Error", error);
            toast.error(error.response?.data?.message || error.message || 'Login Failed');
            return false;
        }
    }, []);

    const register = useCallback(async (name, email, password) => {
        try {
            await api.post('/auth/register', { name, email, password });
            toast.success('Registration Successful! Please Login.');
            return true;
        } catch (error) {
            console.error("Register Error", error);
            toast.error(error.response?.data?.message || 'Registration Failed');
            return false;
        }
    }, []);

    const loginWithToken = useCallback((token) => {
        console.log("AuthContext: loginWithToken called with token length:", token?.length);
        try {
            const decoded = jwtDecode(token);
            console.log("AuthContext: Token decoded successfully", decoded);
            const userData = { id: decoded.id, email: decoded.email, name: decoded.email.split('@')[0] };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('Google Login Successful!');
            return true;
        } catch (error) {
            console.error("AuthContext: Token Login Error", error);
            toast.error('Authentication failed');
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.info('Logged out');
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};

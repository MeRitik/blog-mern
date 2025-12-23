import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: `${VITE_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, []);


    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
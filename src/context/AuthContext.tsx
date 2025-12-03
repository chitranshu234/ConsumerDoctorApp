import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, _password: string, role?: 'patient' | 'doctor') => Promise<void>;
    register: (name: string, email: string, _password: string, role?: 'patient' | 'doctor') => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        user: null,
    });

    useEffect(() => {
        // Check if user is already logged in
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const startTime = Date.now();

            const userJson = await AsyncStorage.getItem('@user');
            if (userJson) {
                const user: User = JSON.parse(userJson);

                // Ensure minimum 2 seconds splash screen display
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 2000 - elapsedTime);

                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(() => resolve(undefined), remainingTime));
                }

                setState({
                    isAuthenticated: true,
                    isLoading: false,
                    user,
                });
            } else {
                // Ensure minimum 2 seconds splash screen display
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 2000 - elapsedTime);

                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(() => resolve(undefined), remainingTime));
                }

                setState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const login = async (email: string, _password: string, role: 'patient' | 'doctor' = 'patient') => {
        try {
            // In a real app, you would call an API here
            // For this demo, we'll create a mock user
            const user: User = {
                id: Date.now().toString(),
                name: email.split('@')[0],
                email,
                role,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(user));
            setState({
                isAuthenticated: true,
                isLoading: false,
                user,
            });
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (name: string, email: string, _password: string, role: 'patient' | 'doctor' = 'patient') => {
        try {
            // In a real app, you would call an API here
            const user: User = {
                id: Date.now().toString(),
                name,
                email,
                role,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(user));
            setState({
                isAuthenticated: true,
                isLoading: false,
                user,
            });
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed');
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@user');
            setState({
                isAuthenticated: false,
                isLoading: false,
                user: null,
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted user
        const storedUser = localStorage.getItem('streakState_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) { // Simple validation
                    const mockUser = {
                        id: 'u1',
                        name: 'John Doe', // In a real app, this would come from the backend
                        email,
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
                    };
                    setUser(mockUser);
                    localStorage.setItem('streakState_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800); // Simulate network delay
        });
    };

    const signup = async (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password) {
                    const newUser = {
                        id: 'u' + Date.now(),
                        name,
                        email,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
                    };
                    setUser(newUser);
                    localStorage.setItem('streakState_user', JSON.stringify(newUser));
                    resolve(newUser);
                } else {
                    reject(new Error('Please fill all fields'));
                }
            }, 800);
        });
    };


    const updateProfile = async (name, email) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email) {
                    const updatedUser = { ...user, name, email, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` };
                    setUser(updatedUser);
                    localStorage.setItem('streakState_user', JSON.stringify(updatedUser));
                    resolve(updatedUser);
                } else {
                    reject(new Error('Name and email are required'));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('streakState_user');
    };

    const value = {
        user,
        login,
        signup,
        updateProfile,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

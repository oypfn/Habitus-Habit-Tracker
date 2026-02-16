import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHabit } from '../context/HabitContext';
import {
    User, Moon, Sun, Bell, Shield, LogOut,
    ChevronRight, Zap, Trash2, Download, Check, X, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings() {
    const { user, logout, updateProfile } = useAuth();
    const { habits, focusState } = useHabit();

    // Preferences
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('streakState_theme') === 'dark';
    });
    const [notifications, setNotifications] = useState(false);

    // Profile Editing
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editEmail, setEditEmail] = useState(user?.email || '');
    const [editLoading, setEditLoading] = useState(false);

    // Dark Mode Effect
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('streakState_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('streakState_theme', 'light');
        }
    }, [darkMode]);

    // Notification Permission Check
    useEffect(() => {
        if ('Notification' in window) {
            setNotifications(Notification.permission === 'granted');
        }
    }, []);

    const toggleNotifications = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support notifications.');
            return;
        }

        if (Notification.permission === 'granted') {
            // We can't actually "revoke" permissions programmatically in JS, 
            // but we can simulate the toggle state for the UI.
            setNotifications(false);
        } else {
            const permission = await Notification.requestPermission();
            setNotifications(permission === 'granted');
        }
    };

    const handleExport = () => {
        const data = {
            user,
            habits,
            focusState,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `streak-state-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleProfileUpdate = async () => {
        setEditLoading(true);
        try {
            await updateProfile(editName, editEmail);
            setIsEditing(false);
        } catch (error) {
            alert(error.message);
        } finally {
            setEditLoading(false);
        }
    };

    const Section = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">{title}</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                {children}
            </div>
        </div>
    );

    const Row = ({ icon: Icon, label, value, onClick, type = 'arrow', color = 'text-gray-900 dark:text-gray-100' }) => (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100' : ''} transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0`}
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
            </div>
            <div className="flex items-center space-x-2">
                {value && <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>}
                {type === 'arrow' && <ChevronRight size={18} className="text-gray-300 dark:text-gray-600" />}
                {type === 'toggle' && (
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-brand-green' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? 'left-6' : 'left-1'}`} />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto p-4 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <header className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            </header>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=User`}
                            alt="Profile"
                            className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700"
                        />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                                Change
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full p-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Name"
                                />
                                <input
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className="w-full p-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Email"
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
                            </>
                        )}
                    </div>

                    <div>
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                                >
                                    <X size={20} />
                                </button>
                                <button
                                    onClick={handleProfileUpdate}
                                    disabled={editLoading}
                                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50"
                                >
                                    {editLoading ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-bold rounded-xl shadow-sm hover:scale-105 transition-transform"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pro Banner */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-brand-lime to-brand-green shadow-lg"
            >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand-lime/20 rounded-lg text-brand-dark dark:text-brand-lime">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Upgrade to Pro</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Unlock infinite habits & analytics</p>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </div>
            </motion.div>

            <Section title="Preferences">
                <Row
                    icon={darkMode ? Moon : Sun}
                    label="Dark Mode"
                    type="toggle"
                    value={darkMode}
                    onClick={() => setDarkMode(!darkMode)}
                />
                <Row
                    icon={Bell}
                    label="Notifications"
                    type="toggle"
                    value={notifications}
                    onClick={toggleNotifications}
                />
            </Section>

            <Section title="Data & Storage">
                <Row
                    icon={Download}
                    label="Export Data"
                    value="JSON"
                    onClick={handleExport}
                />
                <Row
                    icon={Trash2}
                    label="Clear History"
                    color="text-red-500"
                    onClick={() => {
                        if (confirm('Are you sure? This cannot be undone.')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                />
            </Section>

            <Section title="Account">
                <Row icon={Shield} label="Privacy Policy" />
                <Row
                    icon={LogOut}
                    label="Log Out"
                    color="text-red-500"
                    onClick={logout}
                />
            </Section>

            <div className="text-center text-xs text-gray-400 mt-8">
                <p>StreakState v2.1.0 (Build 143)</p>
            </div>
        </div>
    );
}

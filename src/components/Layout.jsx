import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children, activeTab, onTabChange }) {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden relative">
            <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto bg-white shadow-2xl relative scroll-smooth no-scrollbar">
                {children}
            </main>
            <div className="flex-none w-full max-w-md mx-auto bg-white">
                <Navbar activeTab={activeTab} onTabChange={onTabChange} />
            </div>
        </div>
    );
}

import React from 'react';
import { Home, Timer, BarChart2, Settings } from 'lucide-react';
// import { useLocation, Link } from 'react-router-dom'; // Assuming react-router later, but for now simple state?
// For a simple app, maybe just state if not using Router. But implementation plan said "Pages".
// I'll use simple Props or Context for active tab to keep it lightweight if Router isn't set up yet.
// Actually, I'll use a simple prop `activeTab` and `onTabChange`.

export default function Navbar({ activeTab, onTabChange }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'focus', icon: Timer, label: 'Focus' },
        { id: 'insights', icon: BarChart2, label: 'Insights' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center pb-6 md:pb-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className="flex flex-col items-center justify-center space-y-1 w-16"
                    >
                        <div className={`
              p-1.5 rounded-xl transition-all duration-300
              ${isActive ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'}
            `}>
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

import React from 'react';
import { Play, Pause, Headphones, Dumbbell, Flower } from 'lucide-react';
import { useHabit } from '../context/HabitContext';

export default function Focus() {
    const { focusState, toggleTimer, setFocusMode } = useHabit();
    const { isActive, timeLeft, totalTime, mode } = focusState;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateProgress = () => {
        return ((totalTime - timeLeft) / totalTime) * 100;
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Focus</h1>
                <p className="text-gray-500 text-sm mt-1">{mode} timer</p>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center relative mb-12">
                {/* Timer Circle */}
                <div className="relative w-72 h-72 flex items-center justify-center">
                    {/* Background Circle */}
                    <div className="absolute w-full h-full rounded-full border-[12px] border-lime-50"></div>

                    {/* Progress Circle - Conic Gradient */}
                    <div
                        className="absolute w-full h-full rounded-full"
                        style={{
                            background: `conic-gradient(#bef264 ${calculateProgress() * 3.6}deg, transparent 0deg)`,
                            maskImage: 'radial-gradient(transparent 62%, black 63%)', // Creates the ring effect
                            WebkitMaskImage: 'radial-gradient(transparent 62%, black 63%)'
                        }}
                    ></div>

                    {/* Inner Content */}
                    <div className="text-center z-10 flex flex-col items-center">
                        <h2 className="text-6xl font-bold text-gray-900 tracking-tighter font-mono">
                            {formatTime(timeLeft)}
                        </h2>
                        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mt-3">Minutes</p>
                    </div>
                </div>

                <p className="text-gray-500 font-medium mt-10">
                    {isActive ? 'Stay focused...' : 'Ready to start?'}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { id: 'Deep Work', icon: Headphones, time: 25, color: 'bg-lime-100 text-lime-800 border-lime-200' },
                    { id: 'Meditate', icon: Flower, time: 30, color: 'bg-white text-gray-600 border-gray-100' },
                    { id: 'Workout', icon: Dumbbell, time: 45, color: 'bg-white text-gray-600 border-gray-100' },
                ].map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = mode === item.id;
                    return (
                        <button
                            key={idx}
                            onClick={() => setFocusMode(item.id, item.time)}
                            className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-2 
                ${isSelected ? 'bg-lime-100 text-lime-800 border-lime-200 shadow-sm' : 'bg-white text-gray-600 border-gray-100'} 
                active:scale-95 transition-all
              `}
                        >
                            <Icon size={20} />
                            <div className="text-center">
                                <span className="block text-xs font-bold">{item.id}</span>
                                <span className="block text-[10px] opacity-70">{item.time}m</span>
                            </div>
                        </button>
                    )
                })}
            </div>

            <button
                onClick={toggleTimer}
                className={`w-full text-gray-900 font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2
          ${isActive ? 'bg-orange-100 text-orange-600 shadow-orange-100' : 'bg-brand-lime shadow-lime-200'}
        `}
            >
                {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                <span>{isActive ? 'Pause Session' : 'Start Focus'}</span>
            </button>
        </div>
    );
}

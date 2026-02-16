import React from 'react';
import { Flame, Snowflake, Check, Plus, Minus, ChevronRight, Headphones, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHabit } from '../context/HabitContext';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

export default function Home() {
    const { habits, toggleHabit, incrementHabit, decrementHabit } = useHabit();

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Calc progress
    const totalGoal = habits.reduce((acc, h) => acc + h.goal, 0);
    const currentCount = habits.reduce((acc, h) => acc + h.count, 0);
    const progressPercent = Math.round((currentCount / totalGoal) * 100) || 0;

    // Mock data for Deep Work mini chart
    const deepWorkData = [
        { day: 'M', value: 2 },
        { day: 'T', value: 4 },
        { day: 'W', value: 3 },
        { day: 'T', value: 1 },
        { day: 'F', value: 4 },
        { day: 'S', value: 0 },
        { day: 'S', value: 2 },
    ];

    const deepWorkHabit = habits.find(h => h.id === 'coding') || habits[0]; // fallback
    const meditateHabit = habits.find(h => h.id === 'meditate') || habits[2];

    return (
        <div className="p-6 pb-24 space-y-6">
            {/* Header */}
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">StreakState</h1>
                    <p className="text-gray-500 text-sm mt-1">{today}</p>
                </div>
                <div className="flex space-x-3">
                    <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1.5 rounded-full">
                        <Flame size={16} className="text-orange-500 fill-orange-500" />
                        <span className="text-sm font-bold text-gray-900">14</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1.5 rounded-full">
                        <Snowflake size={16} className="text-blue-500" />
                        <span className="text-sm font-bold text-gray-900">0</span>
                    </div>
                </div>
            </header>

            {/* Progress Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
            >
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-lime-100 p-1.5 rounded-lg">
                        <Check size={14} className="text-lime-700" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today's Habits</span>
                </div>

                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {currentCount}/{totalGoal} complete <span className="text-2xl">👏</span>
                    </h2>
                    <div className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-xs font-bold">{progressPercent}%</div>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-brand-lime rounded-full"
                    />
                </div>
            </motion.div>

            {/* Quick Log */}
            <section>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-lime-100 p-1.5 rounded-lg">
                        <Flame size={14} className="text-lime-600 fill-lime-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Log</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {habits.map((habit, index) => (
                        <motion.button
                            key={habit.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleHabit(habit.id)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center space-y-2"
                        >
                            <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm text-white relative
                ${habit.completed ? habit.color : 'bg-gray-100 text-gray-300'}
                transition-colors duration-300
              `}>
                                <Check size={28} strokeWidth={3} />
                                {habit.completed && (
                                    <div className="absolute -bottom-2 -right-2 bg-white text-xs font-bold text-gray-800 px-1.5 py-0.5 rounded-full border border-gray-100 shadow-sm">
                                        {habit.count}/{habit.goal}
                                    </div>
                                )}
                            </div>
                            <span className={`text-xs font-medium ${habit.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                {habit.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Detailed Habit Cards */}
            <section className="space-y-4">

                {/* Deep Work Card (Bar Chart + Counter) */}
                <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2.5 rounded-xl">
                                <Headphones size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Deep Work</h3>
                                <p className="text-gray-400 text-xs">0 days streak • 223 total</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-1">
                            <button
                                onClick={() => decrementHabit(deepWorkHabit.id)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400 hover:text-gray-600 active:scale-95 transition-all"
                            >
                                <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="font-bold text-gray-900 w-6 text-center">{deepWorkHabit.count}/{deepWorkHabit.goal}</span>
                            <button
                                onClick={() => incrementHabit(deepWorkHabit.id)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-900 hover:text-black active:scale-95 transition-all"
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div className="h-24 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deepWorkData}>
                                <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={12}>
                                    {deepWorkData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={'#fcd34d'} /> // Yellow bars
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between mt-2 px-2">
                        {deepWorkData.map((d, i) => (
                            <span key={i} className="text-[10px] text-gray-300 font-bold">{d.day}</span>
                        ))}
                    </div>
                </motion.div>

                {/* Meditate Card (Heatmap) */}
                <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2.5 rounded-xl">
                                <Brain size={20} className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Meditate</h3>
                                <p className="text-gray-500 text-xs">6 days streak • 95 total</p>
                                <p className="text-gray-400 text-[10px] mt-0.5">0 / 1 Daily</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-1">
                            <button
                                onClick={() => decrementHabit(meditateHabit.id)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400 hover:text-gray-600 active:scale-95 transition-all"
                            >
                                <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="font-bold text-gray-900 w-6 text-center">{meditateHabit.count}/{meditateHabit.goal}</span>
                            <button
                                onClick={() => incrementHabit(meditateHabit.id)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-900 hover:text-black active:scale-95 transition-all"
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {/* Heatmap Grid - 4 rows, many columns */}
                        {[...Array(4)].map((_, rowIdx) => (
                            <div key={rowIdx} className="flex justify-between space-x-1">
                                {[...Array(20)].map((_, colIdx) => {
                                    const isFilled = Math.random() > 0.4;
                                    return (
                                        <div
                                            key={colIdx}
                                            className={`h-2 w-full rounded-sm ${isFilled ? 'bg-green-500' : 'bg-green-100'}`}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-2 text-[10px] text-gray-300 font-bold px-1">
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                        <span>Jan</span>
                        <span>Feb</span>
                    </div>

                </motion.div>
            </section>
        </div>
    );
}

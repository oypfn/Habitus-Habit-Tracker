import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, BarChart2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { name: 'M', value: 30 },
    { name: 'T', value: 45 },
    { name: 'W', value: 25 },
    { name: 'T', value: 60 },
    { name: 'F', value: 50 },
    { name: 'S', value: 70 },
    { name: 'S', value: 40 },
];

export default function Insights() {
    return (
        <div className="p-6 pb-24 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
                <p className="text-gray-500 text-sm mt-1">Your progress patterns at a glance</p>
            </header>

            {/* Weekly Performance Chart */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Weekly Performance</h3>
                    <BarChart2 size={16} className="text-gray-300" />
                </div>

                <div className="flex items-baseline space-x-3 mb-6">
                    <h2 className="text-4xl font-bold text-gray-900">63%</h2>
                    <div className="flex items-center space-x-1 bg-lime-100 text-lime-800 px-2 py-1 rounded-lg text-xs font-bold">
                        <TrendingUp size={12} />
                        <span>+4% vs last week</span>
                    </div>
                </div>

                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={32}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#bef264' : '#d9f99d'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Momentum Builder Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-brand-dark p-5 rounded-3xl shadow-lg relative overflow-hidden"
            >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime rounded-full blur-[80px] opacity-15 transform translate-x-10 -translate-y-10"></div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-2 text-brand-lime mb-3">
                        <TrendingUp size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">Momentum Builder</span>
                    </div>
                    <p className="text-white font-medium text-sm leading-relaxed mb-2">
                        You're most consistent on Friday.
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        13% consistency is a solid start. Keep showing up and it will grow.
                    </p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: '🔥', label: 'Total Streaks', val: '12', color: 'orange' },
                    { icon: '📅', label: 'Completed Days', val: '189', color: 'lime' },
                    { icon: '📊', label: 'Consistency', val: '13%', color: 'blue' }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + (idx * 0.05) }}
                        className={`bg-${stat.color}-50 p-4 rounded-2xl border border-${stat.color}-100 flex flex-col items-center justify-center text-center`}
                    >
                        <span className="text-2xl mb-1">{stat.icon}</span>
                        <h4 className="text-xl font-bold text-gray-900">{stat.val}</h4>
                        <p className="text-[9px] font-bold text-gray-500 uppercase leading-tight mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Aggregate Grid (Heatmap) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 p-1.5 rounded-lg">
                            <Calendar size={14} className="text-gray-600" />
                        </div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Aggregate Grid</h3>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-4">One view of all habits across the last 140 days</p>

                <div className="flex flex-wrap gap-1">
                    {[...Array(140)].map((_, i) => {
                        const opacity = Math.random();
                        return (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-sm ${opacity > 0.7 ? 'bg-brand-lime' : 'bg-gray-100'}`}
                            />
                        )
                    })}
                </div>
            </motion.div>

        </div>
    );
}

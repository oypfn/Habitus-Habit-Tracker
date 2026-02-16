import React, { createContext, useContext, useState, useEffect } from 'react';
import { Check, Flame, Zap, Brain, Dumbbell } from 'lucide-react';

const HabitContext = createContext();

export const useHabit = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    // Mock Data Initialization
    const initialHabits = [
        {
            id: 'coding',
            name: 'Coding',
            icon: 'Check',
            color: 'bg-orange-500',
            completed: true,
            count: 4,
            goal: 4,
            streak: 14,
            history: Array(30).fill(0).map(() => Math.random() > 0.3) // Random history
        },
        {
            id: 'workout',
            name: 'Workout',
            icon: 'Dumbbell',
            color: 'bg-indigo-500',
            completed: false,
            count: 0,
            goal: 1,
            streak: 0,
            history: Array(30).fill(0).map(() => Math.random() > 0.6)
        },
        {
            id: 'meditate',
            name: 'Meditate',
            icon: 'Brain',
            color: 'bg-green-500',
            completed: true,
            count: 1,
            goal: 1,
            streak: 7,
            history: Array(30).fill(0).map(() => Math.random() > 0.2)
        },
        {
            id: 'vitamins',
            name: 'Vitamins',
            icon: 'Zap',
            color: 'bg-cyan-500',
            completed: true,
            count: 1,
            goal: 1,
            streak: 30,
            history: Array(30).fill(0).map(() => true)
        },
    ];


    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('streakState_habits');
        return saved ? JSON.parse(saved) : initialHabits;
    });

    useEffect(() => {
        localStorage.setItem('streakState_habits', JSON.stringify(habits));
    }, [habits]);

    // Focus Timer State
    const [focusState, setFocusState] = useState(() => {
        const saved = localStorage.getItem('streakState_focus');
        return saved ? JSON.parse(saved) : {
            isActive: false,
            mode: 'Deep Work', // 'Deep Work', 'Meditate', 'Workout'
            timeLeft: 25 * 60,
            totalTime: 25 * 60,
        };
    });

    useEffect(() => {
        localStorage.setItem('streakState_focus', JSON.stringify(focusState));
    }, [focusState]);

    const toggleHabit = (id) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id === id) {
                const newCompleted = !habit.completed;
                const newCount = newCompleted ? habit.goal : 0; // Simple toggle interaction
                return { ...habit, completed: newCompleted, count: newCount };
            }
            return habit;
        }));
    };

    const incrementHabit = (id) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id === id) {
                const newCount = Math.min(habit.count + 1, habit.goal);
                return { ...habit, count: newCount, completed: newCount === habit.goal };
            }
            return habit;
        }));
    };

    const decrementHabit = (id) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id === id) {
                const newCount = Math.max(habit.count - 1, 0);
                return { ...habit, count: newCount, completed: false };
            }
            return habit;
        }));
    };

    const setFocusMode = (mode, durationMinutes) => {
        setFocusState({
            isActive: false,
            mode,
            timeLeft: durationMinutes * 60,
            totalTime: durationMinutes * 60,
        });
    };

    const toggleTimer = () => {
        setFocusState(prev => ({ ...prev, isActive: !prev.isActive }));
    };

    // Timer Tick Effect
    useEffect(() => {
        let interval = null;
        if (focusState.isActive && focusState.timeLeft > 0) {
            interval = setInterval(() => {
                setFocusState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
            }, 1000);
        } else if (focusState.timeLeft === 0) {
            setFocusState(prev => ({ ...prev, isActive: false }));
        }
        return () => clearInterval(interval);
    }, [focusState.isActive, focusState.timeLeft]);

    const value = {
        habits,
        toggleHabit,
        incrementHabit,
        decrementHabit,
        focusState,
        setFocusMode,
        toggleTimer,
    };

    return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};

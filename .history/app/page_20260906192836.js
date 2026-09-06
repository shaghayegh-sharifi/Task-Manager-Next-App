// app/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Board = dynamic(() => import('../components/Board'), {
  ssr: false,
});
import { FaMoon, FaSun } from 'react-icons/fa';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, read dark mode preference from localStorage.
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newVal);
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-700 transition-colors duration-300'>
      <div className='container mx-auto py-10 min-h-screen flex flex-col'>
        <div className='flex justify-between items-center mb-10'>
          <div className='flex items-center gap-2'>
            <span
              className='border aspect-square w-12 h-12 flex items-center justify-center bg-indigo-300 dark:bg-indigo-600
             text-white rounded-md ring-2 ring-indigo-400 dark:ring-indigo-600 font-bold text-4xl'>
              T
            </span>
            <h1 className='text-4xl font-bold text-indigo-600 dark:text-slate-100'>TaskManager</h1>
          </div>
          <button onClick={toggleDarkMode} className='p-2 rounded-full bg-indigo-300 dark:bg-indigo-600 text-indigo-800 dark:text-slate-100 transition-colors'>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <Board />
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Navbar = () => (
  <nav className="bg-gray-50 border-b-2 fixed w-full dark:bg-gray-900 dark:border-gray-700 z-50 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <h1 className="font-ade text-5xl text-black dark:text-white cursor-default transition-transform duration-500 hover:-skew-x-6">
        RAVA
        </h1>
        <div className="hidden md:flex space-x-8">
          <a
            href="#timer"
            className="font-oskari text-lg text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md"
          >
            Timer
          </a>
          <a
            href="#habits"
            className="font-oskari text-lg text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md"
          >
            Habits
          </a>
          <a
            href="#stats"
            className="font-oskari text-lg text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md"
          >
            Stats
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
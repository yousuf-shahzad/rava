import React, { useState, useEffect } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { Settings, Github } from "lucide-react";
import Navbar from "./Navbar";
import PomodoroTimer from "./PomodoroTimer";
import Stats from "./Stats";
import AddHabit from "./AddHabit";
import HabitList from "./HabitList";
import SettingsModal from "./SettingsModal";

const AppContent = () => {
  const { settings } = useSettings();
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitName, habitEmoji, frequency) => {
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: habitName,
        emoji: habitEmoji,
        frequency,
        completed: false,
        streak: 0,
        lastCompleted: null,
      },
    ]);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const now = new Date();
          const lastCompleted = habit.lastCompleted
            ? new Date(habit.lastCompleted)
            : null;

          let isValidCompletion = true;
          if (lastCompleted) {
            const daysDiff = Math.floor(
              (now - lastCompleted) / (1000 * 60 * 60 * 24)
            );
            isValidCompletion =
              (habit.frequency === "daily" && daysDiff >= 1) ||
              (habit.frequency === "weekly" && daysDiff >= 7) ||
              (habit.frequency === "monthly" && daysDiff >= 30);
          }

          return {
            ...habit,
            completed: !habit.completed,
            streak: isValidCompletion ? habit.streak + 1 : habit.streak,
            lastCompleted: now.toISOString(),
          };
        }
        return habit;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-oskari dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16 transition-all duration-300 hover:scale-[1.02]">
          <h1 className="font-clash text-6xl font-bold text-black dark:text-white transition-colors duration-300">
            Welcome back, <span className="font-normal">{settings.name}.</span>
          </h1>
          <p className="font-supreme text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400 transition-colors duration-300">
            Track your progress, build habits, and stay focused on what matters
            most.
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowSettings(true)}
            className="font-supreme p-3 bg-black text-white rounded-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center gap-2"
          >
            <Settings
              size={20}
              className="transition-transform duration-300 hover:rotate-90"
            />
            <span>Settings</span>
          </button>
        </div>

        {/* Main Sections */}
        <section
          id="timer"
          className="scroll-mt-24 space-y-8 transition-transform duration-300 hover:scale-[1.01]"
        >
          <h2 className="font-mori text-3xl font-bold text-center text-black dark:text-white dark:hover:text-gray-400 hover:text-gray-600 mb-8 transition-all duration-300">
            Focus Timer
          </h2>
          <PomodoroTimer />
        </section>

        <section
          id="stats"
          className="scroll-mt-24 space-y-8 transition-transform duration-300 hover:scale-[1.01]"
        >
          <h2 className="font-mori text-3xl font-bold text-center text-black dark:text-white dark:hover:text-gray-400 hover:text-gray-600 mb-8 transition-all duration-300">
            Your Progress
          </h2>
          <Stats habits={habits} />
        </section>

        <section
          id="habits"
          className="scroll-mt-24 space-y-8 transition-transform duration-300 hover:scale-[1.01]"
        >
          <h2 className="font-mori text-3xl font-bold text-center text-black dark:text-white dark:hover:text-gray-400 hover:text-gray-600 mb-8 transition-all duration-300">
            Habit Tracker
          </h2>
          <AddHabit onAdd={addHabit} />
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
            onDelete={(id) => setHabits(habits.filter((h) => h.id !== id))}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-12 bg-white border-t-2 border-black dark:bg-gray-900 dark:border-gray-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left transition-transform duration-300 hover:scale-105">
              <h2 className="font-ade text-2xl font-bold text-black mb-2 dark:text-white transition-colors duration-300">
                RAVA
              </h2>
              <p className="font-oskari text-gray-600 dark:text-gray-400 transition-colors duration-300">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/yousuf-shahzad/rava"
                target="_blank"
                rel="noopener noreferrer"
                className="font-oskari text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 p-2 rounded-lg"
              >
                <Github
                  size={20}
                  className="transition-transform duration-300 hover:rotate-12"
                />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default AppContent;

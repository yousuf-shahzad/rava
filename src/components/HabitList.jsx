import React from 'react';
import { CheckCircle, Trash2, AlertCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const HabitList = ({ habits, onToggle, onDelete }) => {
  const { settings } = useSettings();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="font-mori text-3xl font-bold text-black dark:text-white
                   transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">
        My Habits
      </h2>
      
      {habits.length === 0 ? (
        <div className="flex items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-lg border-2 
                     border-black dark:border-gray-600 transition-all duration-300 
                     hover:shadow-lg hover:scale-[1.01]">
          <AlertCircle className="text-black dark:text-white transition-transform duration-300 hover:rotate-12" 
                      size={24} />
          <p className="font-oskari text-gray-600 dark:text-gray-300
                     transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-100">
            Start your journey by adding your first habit above!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="group p-6 bg-white dark:bg-gray-800 rounded-lg border-2 
                       border-black dark:border-gray-600 
                       transition-all duration-300 
                       hover:scale-[1.02] hover:shadow-xl
                       active:scale-[1.01] active:shadow-lg"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">
                    {habit.emoji || "🌟"}
                  </span>
                  <div>
                    <h3 className="font-oskari font-medium text-black dark:text-white
                               transition-colors duration-300 
                               group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      {habit.name}
                    </h3>
                    <p className="font-jetbrains text-sm text-gray-600 dark:text-gray-300
                              transition-colors duration-300 
                              group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {habit.streak} {habit.frequency}{habit.streak > 1 ? "s" : ""} streak
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => onToggle(habit.id)}
                    className={`font-oskari flex-1 py-2 rounded-lg flex items-center justify-center gap-2 
                             transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                             active:translate-y-0 active:shadow-md ${
                      habit.completed
                        ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100"
                        : "bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <CheckCircle size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    {habit.completed ? "Completed" : "Mark Done"}
                  </button>
                  <button
                    onClick={() => onDelete(habit.id)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-lg
                           transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-200 
                           dark:hover:bg-gray-600 active:translate-y-0 active:shadow-md"
                  >
                    <Trash2 size={18} className="transition-transform duration-300 hover:rotate-12" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
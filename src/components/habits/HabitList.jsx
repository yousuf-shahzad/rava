import React from 'react';
import { AlertCircle } from 'lucide-react';
import { HabitCard } from './HabitCard';
import { Alert, AlertDescription } from '../ui/alert';

export const HabitList = ({ habits, onToggle, onDelete }) => {
  const hasLongStreak = habits.some(h => h.streak >= 7);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="font-mori text-3xl font-bold text-black dark:text-white
                   transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">
        My Habits
      </h2>
      
      {hasLongStreak && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Congratulations! You've maintained a 7-day streak. Keep up the great work! 🎉
          </AlertDescription>
        </Alert>
      )}
      
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
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
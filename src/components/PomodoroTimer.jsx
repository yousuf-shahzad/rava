import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { formatTime } from '../utils/helpers';
import notification from '../assets/sounds/notification.wav';
import { useSound } from 'use-sound';

const PomodoroTimer = () => {
  const { settings } = useSettings();
  const [play] = useSound(notification);
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  console.log(settings.theme);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      if (settings.notifications) {
        play();
        new Notification(
          isBreak ? "Break finished!" : "Focus session finished!"
        );
      }
      if (settings.startBreakImmediately) {
        setIsRunning(true);
        setIsBreak(!isBreak);
        setTimeLeft(settings.breakDuration * 60);
      } else {
        setIsRunning(false);
        setIsBreak(!isBreak);
        setTimeLeft(
          isBreak ? settings.focusDuration * 60 : settings.breakDuration * 60
        );
      }
      if (!isBreak) {
        setSessions((prev) => [
          ...prev,
          {
            timestamp: new Date().toISOString(),
            task: currentTask,
            duration: settings.focusDuration,
          },
        ]);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, settings, currentTask]);

  return (
    <div className="relative max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="space-y-6">
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="What are you working on?"
          className="font-oskari w-full p-3 bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white dark:placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500"
        />
        <div className="font-oskari text-6xl font-bold text-center text-black dark:text-white transition-transform duration-300 hover:scale-105">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="font-oskari px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center gap-2"
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            <span>{isRunning ? "Pause" : "Start"}</span>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(settings.focusDuration * 60);
              setIsBreak(false);
            }}
            className="group font-oskari px-6 py-3 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-lg transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center gap-2"
          >
            <RefreshCw size={20} className="group transition-transform duration-300 group-hover:rotate-180" />
            <span>Reset</span>
          </button>
        </div>
        {sessions.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
            <h3 className="font-oskari text-black dark:text-white font-medium mb-2">
              Today&apos;s Sessions
            </h3>
            <div className="space-y-2">
              {sessions.slice(-3).map((session, i) => (
                <div
                  key={i}
                  className="font-oskari flex justify-between text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 hover:pl-2 hover:bg-gray-200/50 dark:hover:bg-gray-500/50 rounded p-1"
                >
                  <span>{session.task || "Untitled"}</span>
                  <span>{session.duration} mins</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
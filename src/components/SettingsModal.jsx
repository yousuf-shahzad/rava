import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsModal = ({ isOpen, onClose }) => {
    const { settings, setSettings } = useSettings();
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4">
          <h2 className="font-oskari text-2xl font-bold text-black dark:text-white mb-6">
            Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="font-mori block text-gray-600 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
                className="font-mori w-full p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
              />
            </div>
            <div>
                <label className="font-mori block text-gray-600 dark:text-gray-300 mb-2">
                    Start break timer immediately after focus timer ends
                </label>
                <input
                    type="checkbox"
                    checked={settings.startBreakImmediately}
                    onChange={(e) =>
                        setSettings({ ...settings, startBreakImmediately: e.target.checked })
                    }
                    className="mr-2 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
                />
            </div>
            <div>
              <label className="font-mori block text-gray-600 dark:text-gray-300 mb-2">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.focusDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    focusDuration: parseInt(e.target.value),
                  })
                }
                className="font-mori w-full p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
                min="1"
              />
            </div>
            <div>
              <label className="font-mori block text-gray-600 dark:text-gray-300 mb-2">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.breakDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    breakDuration: parseInt(e.target.value),
                  })
                }
                className="font-mori w-full p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
                min="1"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-mori flex items-center text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({ ...settings, notifications: e.target.checked })
                  }
                  className="mr-2"
                />
                Enable Notifications
              </label>
              <label className="font-mori flex items-center text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={settings.theme === "dark"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: e.target.checked ? "dark" : "light",
                    })
                  }
                  className="mr-2"
                />
                Dark Mode
              </label>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mori mt-6 w-full py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

export default SettingsModal;
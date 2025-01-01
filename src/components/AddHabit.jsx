import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import EmojiPicker from 'emoji-picker-react';

const AddHabit = ({ onAdd }) => {
  const [habitName, setHabitName] = useState("");
  const [habitEmoji, setHabitEmoji] = useState("");
  const [frequency, setFrequency] = useState("day");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { settings } = useSettings();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName, habitEmoji, frequency);
      setHabitName("");
      setHabitEmoji("");
      setFrequency("day");
    }
  };

  const onEmojiClick = (emojiData) => {
    setHabitEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="font-oskari w-full sm:w-20 p-4 text-center bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
            >
              {habitEmoji || "🌟"}
            </button>
            {showEmojiPicker && (
              <div className="absolute z-10 mt-2">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  emojiStyle='twitter'
                  theme={settings.theme === "dark" ? "dark" : "light"}
                  width={300}
                  height={400}
                  lazyLoadEmojis={true}
                  searchPlaceholder="Search emoji..."
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Enter new habit..."
            className="font-oskari flex-1 p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="font-oskari w-full sm:w-auto p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
          <button
            type="submit"
            className="font-supreme w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 active:translate-y-0 active:shadow-md"
          >
            Add Habit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;
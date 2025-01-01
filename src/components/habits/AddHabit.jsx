import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useSettings } from "../../contexts/SettingsContext";

const AddHabit = ({ onAdd }) => {
  const [habitName, setHabitName] = useState("");
  const [habitEmoji, setHabitEmoji] = useState("🌟");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("day");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const { settings } = useSettings();

  const categories = [
    "Health",
    "Productivity",
    "Learning",
    "Fitness",
    "Mindfulness",
    "Custom",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      const finalCategory = category === "Custom" ? customCategory : category;
      onAdd(habitName, habitEmoji, frequency, finalCategory);
      setHabitName("");
      setHabitEmoji("🌟");
      setCategory("");
      setCustomCategory("");
    }
  };

  const onEmojiClick = (emojiData) => {
    setHabitEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="font-oskari w-full p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {category === "Custom" && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category..."
              className="font-oskari w-full p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
            />
          )}
        </div>

        {/* Emoji picker button */}
        <div className="relative self-start">
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
                emojiStyle="twitter"
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

        {/* Habit name input */}
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter new habit..."
          className="font-oskari flex-1 p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
        />

        {/* Frequency select */}
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="font-oskari w-full sm:w-auto p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-lg dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg focus:scale-[1.02]"
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>

        {/* Submit button */}
        <button
          type="submit"
          className="font-supreme w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 active:translate-y-0 active:shadow-md"
        >
          Add Habit
        </button>
      </div>
    </form>
  );
};

export default AddHabit;

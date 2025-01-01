import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = React.createContext();

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          name: "User",
          focusDuration: 25,
          breakDuration: 5,
          notifications: true,
          theme: "dark",
          startBreakImmediately: true,
        };
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    document.documentElement.classList.toggle(
      "dark",
      settings.theme === "dark"
    );
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
import { useState, useEffect } from 'react';

export const useHabitStorage = () => {
  const [habits, setHabits] = useState([]);
  
  useEffect(() => {
    const dbName = 'RavaHabitsDB';
    const request = indexedDB.open(dbName, 1);
    
    request.onerror = () => {
      console.error("IndexedDB error");
      // Fallback to localStorage
      const savedHabits = localStorage.getItem('habits');
      if (savedHabits) setHabits(JSON.parse(savedHabits));
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('habits')) {
        db.createObjectStore('habits', { keyPath: 'id' });
      }
    };
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(habits);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `rava-habits-${new Date().toISOString()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = async (file) => {
    try {
      const text = await file.text();
      const importedHabits = JSON.parse(text);
      setHabits(importedHabits);
      localStorage.setItem('habits', JSON.stringify(importedHabits));
    } catch (error) {
      console.error('Error importing data:', error);
    }
  };

  return { habits, setHabits, exportData, importData };
};
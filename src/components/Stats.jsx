import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useSettings } from '../contexts/SettingsContext';

const Stats = ({ habits }) => {
    const { settings } = useSettings();
    const getStatsData = () => {
      const last7Days = [...Array(7)]
        .map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split("T")[0];
        })
        .reverse();
  
      return last7Days.map((date) => ({
        date: date.split("-")[2],
        completed: habits.filter((h) => {
          const completedDate = h.lastCompleted?.split("T")[0];
          return completedDate === date;
        }).length,
      }));
    };
  
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="font-mori text-3xl font-bold text-black dark:text-white mb-6">
          Weekly Progress
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getStatsData()}>
              <XAxis
                dataKey="date"
                stroke={settings.theme === "dark" ? "#fff" : "#000"}
              />
              <YAxis stroke={settings.theme === "dark" ? "#fff" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: settings.theme === "dark" ? "#1f2937" : "#fff",
                  border: `1px solid ${
                    settings.theme === "dark" ? "#374151" : "#e5e7eb"
                  }`,
                  borderRadius: "8px",
                  color: settings.theme === "dark" ? "#fff" : "#000",
                }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke={settings.theme === "dark" ? "#fff" : "#000"}
                strokeWidth={2}
                dot={{
                  fill: settings.theme === "dark" ? "#fff" : "#000",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>    
      </div>
    );
  };

export default Stats;
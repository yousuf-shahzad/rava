import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useSettings } from '../../contexts/SettingsContext';

const Stats = ({ habits }) => {
    const { settings } = useSettings();
    const [timeframe, setTimeframe] = useState('week');
  
    const getStatsData = () => {
      const periods = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
      const dates = [...Array(periods)]
        .map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        })
        .reverse();
  
      return dates.map(date => ({
        date: date.split('-')[2],
        completed: habits.filter(h => h.lastCompleted?.split('T')[0] === date).length,
        totalHabits: habits.length,
        completionRate: habits.length ? 
          (habits.filter(h => h.lastCompleted?.split('T')[0] === date).length / habits.length * 100).toFixed(1) : 0
      }));
    };
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Progress Analytics</h2>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="p-2 rounded-lg border dark:bg-gray-800"
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
  
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getStatsData()}>
              <XAxis 
              dataKey="date"
              stroke={settings.theme === "dark" ? "#fff" : "#000"}
              />
              <YAxis 
              stroke={settings.theme === "dark" ? "#fff" : "#000"}
              />
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
                dataKey="completionRate" 
                stroke={settings.theme === "dark" ? "#fff" : "#000"}
                strokeWidth={2}
                dot={{
                  fill: settings.theme === "dark" ? "#fff" : "#000",
                  strokeWidth: 2,
                }} 
                name="Completion Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

export default Stats;
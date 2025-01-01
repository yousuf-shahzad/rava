import React, { useState } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import AppContent from './components/AppContent';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <BrowserRouter>
    <Analytics />
      <SettingsProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppContent />}>
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  );
};

export default App;
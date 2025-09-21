import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppThemeProvider } from './contexts/ThemeContext';
import AppDashboard from './App.dashboard';
import AppOrders from './App.orders';

const App: React.FC = () => (
  <AppThemeProvider>
    <Router>
      <Routes>
        <Route path="/order_list" element={<AppOrders />} />
        <Route path="/" element={<AppDashboard />} />
        <Route path="*" element={<AppDashboard />} />
      </Routes>
    </Router>
  </AppThemeProvider>
);

export default App;
import React from 'react';
import Dashboard from './components/Dashboard';
import { mockQuery } from './data/dashboardMockData';
import { AppThemeProvider } from './contexts/ThemeContext';

const AppDashboard: React.FC = () => (
  <AppThemeProvider>
    <Dashboard data={mockQuery} />
  </AppThemeProvider>
);

export default AppDashboard;
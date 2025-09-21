import React from 'react';
import Dashboard from './components/Dashboard';
import { mockQuery } from './data/dashboardMockData';
import { AppThemeProvider } from './contexts/ThemeContext';

const AppMobileDashboard: React.FC = () => (
  <AppThemeProvider>
    <Dashboard data={mockQuery} />
  </AppThemeProvider>
);

export default AppMobileDashboard;
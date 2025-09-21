import React from 'react';
import Dashboard from './components/Dashboard';
import { mockQuery } from './data/dashboardMockData';
import { AppThemeProvider } from './contexts/ThemeContext';

/**
 * Dashboard with Interactive Pie Chart Hover Effects
 * Features smooth hover animations and pop effects on chart segments
 */
const AppPieChartHover: React.FC = () => (
  <AppThemeProvider>
    <Dashboard data={mockQuery} />
  </AppThemeProvider>
);

export default AppPieChartHover;
import React from 'react';
import Dashboard from './components/Dashboard';
import { mockQuery } from './data/dashboardMockData';
import { AppThemeProvider } from './contexts/ThemeContext';

/**
 * Dashboard with Interactive Pie Chart Popup
 * Features detailed popup modals when clicking on pie chart sections
 */
const AppPiePopup: React.FC = () => (
  <AppThemeProvider>
    <Dashboard data={mockQuery} />
  </AppThemeProvider>
);

export default AppPiePopup;
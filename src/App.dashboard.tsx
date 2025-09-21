
import React from 'react';
import Dashboard from './components/Dashboard';
import { mockQuery } from './data/dashboardMockData';

const AppDashboard: React.FC = () => (
  <Dashboard data={mockQuery} />
);

export default AppDashboard;
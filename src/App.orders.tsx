import React from 'react';
import OrdersPage from './components/orders/OrdersPage';
import { mockRootProps } from './data/ordersMockData';
import { AppThemeProvider } from './contexts/ThemeContext';

const AppOrders: React.FC = () => (
  <AppThemeProvider>
    <OrdersPage 
      initialOrders={mockRootProps.initialOrders}
      initialFilters={mockRootProps.initialFilters}
    />
  </AppThemeProvider>
);

export default AppOrders;
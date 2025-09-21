
import React from 'react';
import OrdersPage from './components/orders/OrdersPage';
import { mockRootProps } from './data/ordersMockData';

const AppOrders: React.FC = () => (
  <OrdersPage 
    initialOrders={mockRootProps.initialOrders}
    initialFilters={mockRootProps.initialFilters}
  />
);

export default AppOrders;
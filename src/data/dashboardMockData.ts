// Dashboard metrics data
export const mockStore = {
  user: {
    name: 'ByeWind',
    avatar: 'https://images.unsplash.com/photo-1627843563095-f6e94676cfe0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmQlMjBjb21wYW55fGVufDB8Mnx8fDE3NTgyOTc2NzZ8MA&ixlib=rb-4.1.0&q=85'
  },
  theme: 'light' as const
};

// API response data for dashboard
export const mockQuery = {
  metrics: {
    customers: { value: 3781, change: 11.01 },
    orders: { value: 1219, change: -0.03 },
    revenue: { value: 695, change: 15.03 },
    growth: { value: 30.1, change: 6.08 }
  },
  revenueData: {
    currentWeek: 58211,
    previousWeek: 68768,
    chartData: [
      { month: 'Jan', current: 15000, previous: 18000 },
      { month: 'Feb', current: 22000, previous: 25000 },
      { month: 'Mar', current: 18000, previous: 20000 },
      { month: 'Apr', current: 25000, previous: 22000 },
      { month: 'May', current: 28000, previous: 24000 },
      { month: 'Jun', current: 32000, previous: 28000 }
    ]
  },
  projectionsData: [
    { month: 'Jan', actual: 12000, projected: 15000 },
    { month: 'Feb', actual: 18000, projected: 20000 },
    { month: 'Mar', actual: 22000, projected: 25000 },
    { month: 'Apr', actual: 28000, projected: 30000 },
    { month: 'May', actual: 25000, projected: 28000 },
    { month: 'Jun', actual: 30000, projected: 32000 }
  ],
  locationRevenue: [
    { city: 'New York', value: 72000 },
    { city: 'San Francisco', value: 39000 },
    { city: 'Sydney', value: 25000 },
    { city: 'Singapore', value: 61000 }
  ],
  topProducts: [
    { name: 'ASOS Ridley High Waist', price: 79.49, quantity: 82, amount: 6518.18 },
    { name: 'Marco Lightweight Shirt', price: 128.50, quantity: 37, amount: 4754.50 },
    { name: 'Half Sleeve Shirt', price: 39.99, quantity: 64, amount: 2559.36 },
    { name: 'Lightweight Jacket', price: 20.00, quantity: 184, amount: 3680.00 },
    { name: 'Marco Shoes', price: 79.49, quantity: 64, amount: 1965.81 }
  ],
  salesBreakdown: [
    { category: 'Direct' as const, value: 300.56, percentage: 38.6 },
    { category: 'Affilliate' as const, value: 135.18, percentage: 25.2 },
    { category: 'Sponsored' as const, value: 154.02, percentage: 28.4 },
    { category: 'E-mail' as const, value: 48.96, percentage: 7.8 }
  ],
  notifications: [
    { id: 1, type: 'bug' as const, message: 'You have a bug that needs to be fixed.', timestamp: new Date() },
    { id: 2, type: 'user' as const, message: 'New user registered', timestamp: new Date(Date.now() - 59 * 60 * 1000) },
    { id: 3, type: 'bug' as const, message: 'You have a bug that needs to be fixed.', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 4, type: 'subscription' as const, message: 'Andi Lane subscribed to you', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) }
  ],
  activities: [
    { id: 1, user: 'https://i.pravatar.cc/150?img=1', message: 'You have a bug that needs to be fixed.', timestamp: new Date() },
    { id: 2, user: 'https://i.pravatar.cc/150?img=2', message: 'Released a new version', timestamp: new Date(Date.now() - 59 * 60 * 1000) },
    { id: 3, user: 'https://i.pravatar.cc/150?img=3', message: 'Submitted a bug', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 4, user: 'https://i.pravatar.cc/150?img=4', message: 'Modified A data in Page X', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: 5, user: 'https://i.pravatar.cc/150?img=5', message: 'Deleted a page in Project X', timestamp: new Date('2023-02-02') }
  ],
  contacts: [
    { id: 1, name: 'Natali Craig', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Drew Cano', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'Andi Lane', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 5, name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 6, name: 'Koray Okumus', avatar: 'https://i.pravatar.cc/150?img=16' }
  ]
};

// Props passed to root component
export const mockRootProps = {
  initialData: mockQuery
};

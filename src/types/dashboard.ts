// Props types (data passed to components)
export interface DashboardProps {
  initialData: DashboardData;
}

// Store types (global state data)
export interface DashboardStore {
  user: {
    name: string;
    avatar: string;
  };
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

// Query types (API response data)
export interface DashboardData {
  metrics: {
    customers: MetricData;
    orders: MetricData;
    revenue: MetricData;
    growth: MetricData;
  };
  revenueData: {
    currentWeek: number;
    previousWeek: number;
    chartData: ChartDataPoint[];
  };
  projectionsData: ProjectionDataPoint[];
  locationRevenue: LocationRevenueData[];
  topProducts: ProductData[];
  salesBreakdown: SalesBreakdownData[];
  notifications: NotificationData[];
  activities: ActivityData[];
  contacts: ContactData[];
}

export interface MetricData {
  value: number;
  change: number;
}

export interface ChartDataPoint {
  month: string;
  current: number;
  previous: number;
}

export interface ProjectionDataPoint {
  month: string;
  actual: number;
  projected: number;
}

export interface LocationRevenueData {
  city: string;
  value: number;
}

export interface ProductData {
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface SalesBreakdownData {
  category: 'Direct' | 'Affilliate' | 'Sponsored' | 'E-mail';
  value: number;
  percentage: number;
}

export interface NotificationData {
  id: number;
  type: 'bug' | 'user' | 'subscription';
  message: string;
  timestamp: Date;
}

export interface ActivityData {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
}

export interface ContactData {
  id: number;
  name: string;
  avatar: string;
}
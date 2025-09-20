// Order status enumeration
export enum OrderStatus {
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

// Table sort direction
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

// Table column identifiers
export enum OrderTableColumn {
  ORDER_ID = 'orderId',
  USER = 'user',
  PROJECT = 'project',
  ADDRESS = 'address',
  DATE = 'date',
  STATUS = 'status'
}

// Props types (data passed to components)
export interface OrdersPageProps {
  initialOrders: OrderData[];
  initialFilters: OrderFilters;
}

export interface OrderData {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: Date;
  status: OrderStatus;
}

export interface OrderFilters {
  search: string;
  status: OrderStatus | null;
  sortBy: keyof OrderData;
  sortDirection: 'asc' | 'desc';
  page: number;
  itemsPerPage: number;
}

// Store types (global state data)
export interface OrdersStore {
  orders: OrderData[];
  filters: OrderFilters;
  selectedOrders: string[];
  isLoading: boolean;
  totalCount: number;
}

// Query types (API response data)
export interface OrdersQueryResponse {
  orders: OrderData[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
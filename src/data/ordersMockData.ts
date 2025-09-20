import { OrderStatus } from '../types/orders';

// Data for global state store
export const mockStore = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 50,
  sortColumn: 'date' as const,
  sortDirection: 'desc' as const,
  searchQuery: '',
  statusFilter: null as OrderStatus | null
};

// Data returned by API queries
export const mockQuery = {
  orders: [
    {
      id: 'CM9801',
      user: {
        name: 'Natali Craig',
        avatar: '/images/avatars/natali-craig.png'
      },
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: new Date(),
      status: OrderStatus.IN_PROGRESS
    },
    {
      id: 'CM9802',
      user: {
        name: 'Kate Morrison',
        avatar: '/images/avatars/kate-morrison.png'
      },
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: new Date(Date.now() - 60000),
      status: OrderStatus.COMPLETE
    },
    {
      id: 'CM9803',
      user: {
        name: 'Drew Cano',
        avatar: '/images/avatars/drew-cano.png'
      },
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: new Date(Date.now() - 3600000),
      status: OrderStatus.PENDING
    },
    {
      id: 'CM9804',
      user: {
        name: 'Orlando Diggs',
        avatar: '/images/avatars/orlando-diggs.png'
      },
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: new Date(Date.now() - 86400000),
      status: OrderStatus.APPROVED
    },
    {
      id: 'CM9805',
      user: {
        name: 'Andi Lane',
        avatar: '/images/avatars/andi-lane.png'
      },
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: new Date('2023-02-02'),
      status: OrderStatus.REJECTED
    },
    // Duplicate entries for pagination demonstration
    {
      id: 'CM9801',
      user: {
        name: 'Natali Craig',
        avatar: '/images/avatars/natali-craig.png'
      },
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: new Date(),
      status: OrderStatus.IN_PROGRESS
    },
    {
      id: 'CM9802',
      user: {
        name: 'Kate Morrison',
        avatar: '/images/avatars/kate-morrison.png'
      },
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: new Date(Date.now() - 60000),
      status: OrderStatus.COMPLETE
    },
    {
      id: 'CM9803',
      user: {
        name: 'Drew Cano',
        avatar: '/images/avatars/drew-cano.png'
      },
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: new Date(Date.now() - 3600000),
      status: OrderStatus.PENDING
    },
    {
      id: 'CM9804',
      user: {
        name: 'Orlando Diggs',
        avatar: '/images/avatars/orlando-diggs.png'
      },
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: new Date(Date.now() - 86400000),
      status: OrderStatus.APPROVED
    },
    {
      id: 'CM9805',
      user: {
        name: 'Andi Lane',
        avatar: '/images/avatars/andi-lane.png'
      },
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: new Date('2023-02-02'),
      status: OrderStatus.REJECTED
    }
  ]
};

// Data passed as props to the root component
export const mockRootProps = {
  initialOrders: mockQuery.orders,
  initialFilters: {
    search: '',
    status: null,
    sortBy: 'date' as keyof import('../types/orders').OrderData,
  sortDirection: 'desc' as 'desc' | 'asc',
    page: 1,
    itemsPerPage: 10
  }
};
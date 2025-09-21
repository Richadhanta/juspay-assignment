# Dashboard Project

A modern, responsive React dashboard application built with TypeScript, Material-UI v7, and MUI X Charts. Features a comprehensive eCommerce dashboard with interactive charts, data tables, and responsive design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Charts**: Line charts, bar charts, pie charts, and world map visualization
- **Data Tables**: Sortable and scrollable product tables with hover effects
- **Theme Support**: Light/dark mode toggle with custom Material-UI theme
- **Mobile Navigation**: Collapsible sidebars and mobile-friendly navigation
- **Real-time Data**: Mock data with realistic business metrics
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dashboard-project
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser

Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
dashboard-project/
├── public/                     # Static assets
│   └── images/                 # Image assets
│       ├── avatars/           # User avatar images
│       ├── brand-logo.png     # Brand logo
│       ├── world-map.svg      # World map SVG
│       └── *.svg              # Chart icons
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── charts/           # Chart components
│   │   │   ├── ProjectionsChart.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   └── SalesChart.tsx
│   │   ├── Dashboard.tsx     # Main dashboard component
│   │   ├── Header.tsx        # Navigation header
│   │   ├── ProductsTable.tsx # Data table component
│   │   ├── ResponsiveLayout.tsx # Layout wrapper
│   │   ├── Sidebar.tsx       # Desktop sidebar
│   │   ├── MobileSidebar.tsx # Mobile sidebar
│   │   ├── RightSidebar.tsx  # Notifications sidebar
│   │   └── WorldMap.tsx      # World map component
│   ├── contexts/             # React contexts
│   │   └── ThemeContext.tsx  # Theme provider
│   ├── data/                 # Mock data
│   │   ├── dashboardMockData.ts
│   │   └── ordersMockData.ts
│   ├── theme/                # Material-UI theme
│   │   └── theme.ts
│   ├── types/                # TypeScript types
│   │   ├── dashboard.ts
│   │   └── orders.ts
│   ├── utils/                # Utility functions
│   │   ├── formatters.ts
│   │   └── orderFormatters.ts
│   ├── App.dashboard.tsx     # Dashboard app entry
│   ├── App.responsive.tsx    # Responsive app wrapper
│   ├── App.responsivefixed.tsx # Fixed responsive version
│   └── index.css            # Global styles
├── Wrapper.tsx              # App wrapper component
├── main.tsx                 # Application entry point
└── package.json            # Dependencies and scripts
```

##  Component Documentation

### Core Components

#### `Dashboard.tsx`
Main dashboard component that orchestrates all other components.

**Props:**
- `data: DashboardData` - Complete dashboard data including metrics, charts, and tables

**Features:**
- Responsive metric cards
- Chart layout management
- Mobile drawer state management

#### `ResponsiveLayout.tsx`
Handles responsive behavior across different screen sizes.

**Props:**
- `leftContent: React.ReactNode` - Left sidebar content
- `centerContent: React.ReactNode` - Main content area
- `rightContent: React.ReactNode` - Right sidebar content
- `leftDrawerOpen?: boolean` - Left drawer state
- `rightDrawerOpen?: boolean` - Right drawer state

**Features:**
- Automatic sidebar hiding on smaller screens
- Mobile drawer navigation
- Floating action buttons for tablets

#### `Header.tsx`
Navigation header with search, breadcrumbs, and theme toggle.

**Props:**
- `onMenuClick?: () => void` - Menu button click handler
- `onNotificationClick?: () => void` - Notification button click handler

**Features:**
- Responsive search bar
- Theme toggle button
- Breadcrumb navigation

### Chart Components

#### `ProjectionsChart.tsx`
Bar chart comparing projected vs actual values.

**Props:**
- `data: ProjectionDataPoint[]` - Array of projection data points

**Features:**
- Responsive sizing (320px-420px height)
- Mobile horizontal scrolling
- Interactive tooltips

#### `RevenueChart.tsx`
Line chart showing revenue trends over time.

**Props:**
- `data: ChartDataPoint[]` - Chart data points
- `currentWeek: number` - Current week total
- `previousWeek: number` - Previous week total

**Features:**
- Dual line series (current vs previous)
- Interactive markers
- Responsive legend layout

#### `SalesChart.tsx`
Pie chart showing sales breakdown by category.

**Props:**
- `data: SalesBreakdownData[]` - Sales breakdown data

**Features:**
- Interactive pie segments
- Clickable legend items
- Hover effects and tooltips

#### `WorldMap.tsx`
World map visualization with location-based revenue data.

**Props:**
- `data: LocationRevenueData[]` - Location revenue data

**Features:**
- SVG world map with interactive dots
- Revenue bars for each location
- Responsive map sizing

### Table Components

#### `ProductsTable.tsx`
Data table displaying top-selling products.

**Props:**
- `data: ProductData[]` - Product data array

**Features:**
- Responsive column layout
- Mobile horizontal scrolling
- Hover effects on rows
- Proper spacing between columns

## 🎨 Theming

The project uses a custom Material-UI theme with support for light and dark modes.

### Theme Structure

```typescript
// Located in src/theme/theme.ts
const theme = createTheme({
  palette: {
    primary: { main: '#1c1c1c' },
    secondary: { main: '#e3f5ff' },
    background: {
      default: '#ffffff',
      paper: '#f7f9fb'
    }
    // ... more theme configuration
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    // ... typography settings
  }
});
```

### Using the Theme

```typescript
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary 
    }}>
      Content
    </Box>
  );
};
```

## 📊 Data Management

### Mock Data Structure

The project uses TypeScript interfaces for type safety:

```typescript
// Dashboard data structure
interface DashboardData {
  metrics: MetricsData;
  projectionsData: ProjectionDataPoint[];
  revenueData: RevenueData;
  salesBreakdown: SalesBreakdownData[];
  locationRevenue: LocationRevenueData[];
  topProducts: ProductData[];
  notifications: NotificationData[];
  activities: ActivityData[];
  contacts: ContactData[];
}
```

### Data Formatting

Utility functions for consistent data formatting:

```typescript
// Located in src/utils/formatters.ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};
```

## 📱 Responsive Design

### Breakpoints

The project uses Material-UI's default breakpoints:

- **xs**: 0px and up (mobile)
- **sm**: 600px and up (tablet)
- **md**: 900px and up (small desktop)
- **lg**: 1200px and up (desktop)
- **xl**: 1536px and up (large desktop)

### Mobile-First Approach

All components are designed mobile-first with progressive enhancement:

```typescript
// Example responsive styling
const ResponsiveComponent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1), // Mobile default
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2), // Tablet
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3), // Desktop
  },
}));
```

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all components
- Follow React functional component patterns
- Use Material-UI's `sx` prop for styling
- Implement proper error boundaries
- Use meaningful component and variable names

### Component Structure

```typescript
// Standard component structure
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  // styles
}));

// TypeScript interfaces
interface MyComponentProps {
  title: string;
  data: DataType[];
}

// Main component
const MyComponent: React.FC<MyComponentProps> = ({ title, data }) => {
  return (
    <StyledContainer>
      <Typography variant="h6">{title}</Typography>
      {/* Component content */}
    </StyledContainer>
  );
};

export default MyComponent;
```

## 🚀 Build & Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=Dashboard App
```

## 🧪 Testing

### Running Tests

```bash
npm run test
# or
yarn test
```

### Test Structure

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for data flow

## 📈 Performance Optimization

### Code Splitting

The project uses React.lazy for code splitting:

```typescript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Image Optimization

- Use WebP format when possible
- Implement lazy loading for images
- Optimize SVG files for smaller bundle size

## 🐛 Troubleshooting

### Common Issues

1. **Charts not displaying**: Ensure MUI X Charts is properly installed
2. **Mobile scrolling not working**: Check CSS overflow properties
3. **Theme not applying**: Verify ThemeProvider wrapper
4. **Build errors**: Check TypeScript types and imports

### Debug Mode

Enable debug logging by setting:

```typescript
// In development
console.log('Debug info:', data);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components are responsive
- [ ] Code follows project conventions
- [ ] Tests are included for new features
- [ ] Documentation is updated

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- MUI X Charts for powerful charting capabilities
- React team for the amazing framework
- TypeScript team for type safety

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review existing issues for solutions

---

**Happy coding!** 🎉
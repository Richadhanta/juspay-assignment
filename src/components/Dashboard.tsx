import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';
import RightSidebar from './RightSidebar';
import MetricCard from './MetricCard';
import ProjectionsChart from './charts/ProjectionsChart';
import RevenueChart from './charts/RevenueChart';
import SalesChart from './charts/SalesChart';
import WorldMap from './WorldMap';
import ProductsTable from './ProductsTable';
import type { DashboardData } from '../types/dashboard';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  position: 'relative'
}));

const SidebarContainer = styled(Box)({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1200
});

const RightSidebarContainer = styled(Box)({
  position: 'fixed',
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1200
});

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '212px', // Sidebar width
  marginRight: '280px', // Right sidebar width
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
    marginRight: 0,
  }
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.background.default
}));

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <MainContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        
        <ContentArea>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          
          <MainContent>
            <Typography variant="h6" sx={{ mb: 3, fontSize: 14, fontWeight: 600 }}>
              eCommerce
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3.5}
              sx={{ mb: 3.5 }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <MetricCard
                  title="Customers"
                  value={data.metrics.customers.value}
                  change={data.metrics.customers.change}
                  backgroundColor="secondary.main"
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <MetricCard
                  title="Orders"
                  value={data.metrics.orders.value}
                  change={data.metrics.orders.change}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <MetricCard
                  title="Revenue"
                  value={data.metrics.revenue.value}
                  change={data.metrics.revenue.change}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <MetricCard
                  title="Growth"
                  value={data.metrics.growth.value}
                  change={data.metrics.growth.change}
                  backgroundColor="grey.50"
                />
              </Box>
            </Stack>

            <Stack spacing={3.5}>
              <Stack 
                direction={{ xs: 'column', lg: 'row' }}
                spacing={3.5}
              >
                <Box sx={{ flex: { lg: '1 1 60%' }, minWidth: 0 }}>
                  <ProjectionsChart data={data.projectionsData} />
                </Box>
                <Box sx={{ flex: { lg: '1 1 40%' }, minWidth: 0 }}>
                  <WorldMap data={data.locationRevenue} />
                </Box>
              </Stack>

              <Stack 
                direction={{ xs: 'column', lg: 'row' }}
                spacing={3.5}
              >
                <Box sx={{ flex: { lg: '1 1 60%' }, minWidth: 0 }}>
                  <RevenueChart
                    data={data.revenueData.chartData}
                    currentWeek={data.revenueData.currentWeek}
                    previousWeek={data.revenueData.previousWeek}
                  />
                </Box>
                <Box sx={{ flex: { lg: '1 1 40%' }, minWidth: 0 }}>
                  <SalesChart data={data.salesBreakdown} />
                </Box>
              </Stack>

              <ProductsTable data={data.topProducts} />
            </Stack>
          </MainContent>
        </ContentArea>

        <RightSidebarContainer>
          <RightSidebar
            notifications={data.notifications}
            activities={data.activities}
            contacts={data.contacts}
          />
        </RightSidebarContainer>
    </MainContainer>
  );
};

export default Dashboard;
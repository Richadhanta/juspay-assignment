import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ResponsiveLayout from './ResponsiveLayout';
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

const CenterContent = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: {
    paddingTop: 0
  }
}));

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const handleMenuClick = () => setLeftDrawerOpen(!leftDrawerOpen);
  const handleNotificationClick = () => setRightDrawerOpen(!rightDrawerOpen);

  const leftContent = <Sidebar />;
  
  const centerContent = (
    <CenterContent>
      <HeaderContainer>
        <Header onMenuClick={handleMenuClick} onNotificationClick={handleNotificationClick} />
      </HeaderContainer>
      
      <MainContent>
        <Typography variant="h6" sx={{ mb: 3, fontSize: 14, fontWeight: 600 }}>
          eCommerce
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3.5}
          sx={{ 
            mb: 3.5,
            flexWrap: { xs: 'wrap', sm: 'nowrap' }
          }}
        >
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%' }, minWidth: 0 }}>
            <MetricCard
              title="Customers"
              value={data.metrics.customers.value}
              change={data.metrics.customers.change}
              backgroundColor="secondary.main"
            />
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%' }, minWidth: 0 }}>
            <MetricCard
              title="Orders"
              value={data.metrics.orders.value}
              change={data.metrics.orders.change}
            />
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%' }, minWidth: 0 }}>
            <MetricCard
              title="Revenue"
              value={data.metrics.revenue.value}
              change={data.metrics.revenue.change}
            />
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%' }, minWidth: 0 }}>
            <MetricCard
              title="Growth"
              value={data.metrics.growth.value}
              change={data.metrics.growth.change}
              backgroundColor="grey.50"
            />
          </Box>
        </Stack>

        <Stack 
          spacing={3.5}
          sx={{ 
            flexWrap: 'wrap',
            '& > *': {
              minWidth: 0 // Prevent flex items from overflowing
            }
          }}
        >
          <Stack 
            direction={{ xs: 'column', lg: 'row' }}
            spacing={3.5}
            sx={{ 
              flexWrap: { xs: 'wrap', lg: 'nowrap' },
              '& > *': {
                minWidth: 0,
                minHeight: { xs: 300, sm: 320, md: 350 }
              }
            }}
          >
            <Box sx={{ 
              flex: { xs: '1 1 100%', lg: '1 1 60%' }, 
              minWidth: 0,
              width: '100%'
            }}>
              <ProjectionsChart data={data.projectionsData} />
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', lg: '1 1 40%' }, 
              minWidth: 0,
              width: '100%'
            }}>
              <WorldMap data={data.locationRevenue} />
            </Box>
          </Stack>

          <Stack 
            direction={{ xs: 'column', lg: 'row' }}
            spacing={3.5}
            sx={{ 
              flexWrap: { xs: 'wrap', lg: 'nowrap' },
              '& > *': {
                minWidth: 0,
                minHeight: { xs: 300, sm: 320, md: 350 }
              }
            }}
          >
            <Box sx={{ 
              flex: { xs: '1 1 100%', lg: '1 1 60%' }, 
              minWidth: 0,
              width: '100%'
            }}>
              <RevenueChart
                data={data.revenueData.chartData}
                currentWeek={data.revenueData.currentWeek}
                previousWeek={data.revenueData.previousWeek}
              />
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', lg: '1 1 40%' }, 
              minWidth: 0,
              width: '100%'
            }}>
              <SalesChart data={data.salesBreakdown} />
            </Box>
          </Stack>

          <ProductsTable data={data.topProducts} />
        </Stack>
      </MainContent>
    </CenterContent>
  );
  
  const rightContent = (
    <RightSidebar
      notifications={data.notifications}
      activities={data.activities}
      contacts={data.contacts}
    />
  );

  return (
    <ResponsiveLayout
      leftContent={leftContent}
      centerContent={centerContent}
      rightContent={rightContent}
      leftDrawerOpen={leftDrawerOpen}
      rightDrawerOpen={rightDrawerOpen}
      onLeftDrawerToggle={handleMenuClick}
      onRightDrawerToggle={handleNotificationClick}
      mobileNotificationsData={{
        notifications: data.notifications,
        activities: data.activities,
        contacts: data.contacts
      }}
    />
  );
};

export default Dashboard;
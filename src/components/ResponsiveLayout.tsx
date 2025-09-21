import React, { useState } from 'react';
import { 
  Stack, 
  useMediaQuery, 
  useTheme, 
  Drawer, 
  IconButton, 
  AppBar, 
  Toolbar, 
  Typography,
  Fab,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import MobileSidebar from './MobileSidebar';
import MobileNotifications from './MobileNotifications';

const ResponsiveContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  width: '100%',
  overflow: 'hidden'
}));

const LeftSection = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  zIndex: 1200,
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}));

const CenterSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden'
}));

const RightSection = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  zIndex: 1200,
  [theme.breakpoints.down('xl')]: {
    display: 'none'
  }
}));

const MobileNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  }
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.background.default,
  }
}));

const NotificationFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1300,
  [theme.breakpoints.up('xl')]: {
    display: 'none'
  }
}));

interface ResponsiveLayoutProps {
  leftContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftDrawerOpen?: boolean;
  rightDrawerOpen?: boolean;
  onLeftDrawerToggle?: () => void;
  onRightDrawerToggle?: () => void;
  mobileNotificationsData?: {
    notifications: any[];
    activities: any[];
    contacts: any[];
  };
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  leftContent,
  centerContent,
  rightContent,
  leftDrawerOpen = false,
  rightDrawerOpen = false,
  onLeftDrawerToggle,
  onRightDrawerToggle,
  mobileNotificationsData
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [internalLeftDrawerOpen, setInternalLeftDrawerOpen] = useState(false);
  const [internalRightDrawerOpen, setInternalRightDrawerOpen] = useState(false);

  const toggleLeftDrawer = onLeftDrawerToggle || (() => setInternalLeftDrawerOpen(!internalLeftDrawerOpen));
  const toggleRightDrawer = onRightDrawerToggle || (() => setInternalRightDrawerOpen(!internalRightDrawerOpen));
  
  const actualLeftDrawerOpen = onLeftDrawerToggle ? leftDrawerOpen : internalLeftDrawerOpen;
  const actualRightDrawerOpen = onRightDrawerToggle ? rightDrawerOpen : internalRightDrawerOpen;

  return (
    <>
      {/* Mobile Navigation Bar */}
      {isMobile && (
        <MobileNavBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleLeftDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 16, fontWeight: 600 }}>
              Dashboard
            </Typography>
            <IconButton
              color="inherit"
              aria-label="notifications"
              onClick={toggleRightDrawer}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </MobileNavBar>
      )}

      {/* Mobile Left Drawer */}
      <MobileDrawer
        anchor="left"
        open={actualLeftDrawerOpen}
        onClose={toggleLeftDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            Navigation
          </Typography>
          <IconButton onClick={toggleLeftDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <MobileSidebar onClose={toggleLeftDrawer} />
      </MobileDrawer>

      {/* Mobile Right Drawer */}
      <MobileDrawer
        anchor="right"
        open={actualRightDrawerOpen}
        onClose={toggleRightDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            Notifications
          </Typography>
          <IconButton onClick={toggleRightDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {mobileNotificationsData ? (
          <MobileNotifications 
            notifications={mobileNotificationsData.notifications}
            activities={mobileNotificationsData.activities}
            contacts={mobileNotificationsData.contacts}
          />
        ) : (
          rightContent
        )}
      </MobileDrawer>

      {/* Main Layout */}
      <ResponsiveContainer
        direction="row"
        sx={{
          flexWrap: { xs: 'wrap', lg: 'nowrap' },
          paddingTop: isMobile ? 0 : 0
        }}
      >
        {isLargeScreen && (
          <LeftSection>
            {leftContent}
          </LeftSection>
        )}
        
        <CenterSection
          sx={{
            width: {
              xs: '100%',
              lg: isExtraLargeScreen ? 'calc(100% - 492px)' : 'calc(100% - 212px)',
              xl: 'calc(100% - 492px)'
            }
          }}
        >
          {centerContent}
        </CenterSection>
        
        {isExtraLargeScreen && (
          <RightSection>
            {rightContent}
          </RightSection>
        )}
      </ResponsiveContainer>

      {/* Floating Notification Button for tablets */}
      {!isExtraLargeScreen && !isMobile && (
        <NotificationFab
          color="primary"
          aria-label="notifications"
          onClick={toggleRightDrawer}
        >
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </NotificationFab>
      )}
    </>
  );
};

export default ResponsiveLayout;
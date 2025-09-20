import React, { useState } from 'react';
import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const DRAWER_WIDTH = 212;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    position: 'fixed',
    height: '100vh',
    zIndex: 1200
  }
}));

const BrandContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  alignItems: 'center',
  gap: theme.spacing(1)
}));

const BrandLogo = styled('img')({
  width: 24,
  height: 24,
  borderRadius: '50%'
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 2.5),
  marginTop: theme.spacing(2)
}));

const TabContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  gap: theme.spacing(0.5)
}));

const TabButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: active ? theme.palette.text.primary : theme.palette.text.disabled,
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1)
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0, 1),
  backgroundColor: active ? theme.palette.grey[200] : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.grey[200]
  }
}));

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Favorites');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboards']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigationItems = [
    { icon: PieChartOutlinedIcon, label: 'Overview', hasChildren: false },
    { icon: FolderOpenOutlinedIcon, label: 'Projects', hasChildren: false }
  ];

  const dashboardItems = [
    { icon: PieChartOutlinedIcon, label: 'Default', active: true },
    { icon: ShoppingBagOutlinedIcon, label: 'eCommerce', hasChildren: false },
    { icon: FolderOpenOutlinedIcon, label: 'Projects', hasChildren: false },
    { icon: AutoStoriesOutlinedIcon, label: 'Online Courses', hasChildren: false }
  ];

  const pageItems = [
    { icon: BadgeOutlinedIcon, label: 'User Profile', hasChildren: true, children: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Followers'] },
    { icon: BadgeOutlinedIcon, label: 'Account', hasChildren: false },
    { icon: Groups2OutlinedIcon, label: 'Corporate', hasChildren: false },
    { icon: CreateOutlinedIcon, label: 'Blog', hasChildren: false },
    { icon: ChatBubbleOutlinedIcon, label: 'Social', hasChildren: false }
  ];

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <BrandContainer direction="row">
        <BrandLogo 
          src="/images/brand-logo.png" 
          alt="ByeWind brand logo" 
        />
        <Typography variant="body1" sx={{ fontWeight: 400 }}>
          ByeWind
        </Typography>
      </BrandContainer>

      <TabContainer direction="row">
        <TabButton 
          active={activeTab === 'Favorites'} 
          onClick={() => setActiveTab('Favorites')}
        >
          Favorites
        </TabButton>
        <TabButton 
          active={activeTab === 'Recently'} 
          onClick={() => setActiveTab('Recently')}
        >
          Recently
        </TabButton>
      </TabContainer>

      <List sx={{ px: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <StyledListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <item.icon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: 14, fontWeight: 400 }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <SectionTitle>Dashboards</SectionTitle>
      <List sx={{ px: 1 }}>
        {dashboardItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <StyledListItemButton active={item.active}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <item.icon sx={{ fontSize: 20, color: item.active ? 'text.primary' : 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontSize: 14, 
                  fontWeight: 400,
                  color: item.active ? 'text.primary' : 'text.primary'
                }}
              />
              {item.hasChildren && (
                <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              )}
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <SectionTitle>Pages</SectionTitle>
      <List sx={{ px: 1 }}>
        {pageItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding>
              <StyledListItemButton onClick={() => item.hasChildren && toggleSection(item.label)}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <item.icon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 400 }}
                />
                {item.hasChildren && (
                  expandedSections.includes(item.label) ? 
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /> :
                    <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                )}
              </StyledListItemButton>
            </ListItem>
            {item.hasChildren && (
              <Collapse in={expandedSections.includes(item.label)} timeout="auto" unmountOnExit>
                <List sx={{ pl: 4 }}>
                  {item.children?.map((child) => (
                    <ListItem key={child} disablePadding>
                      <StyledListItemButton>
                        <ListItemText 
                          primary={child} 
                          primaryTypographyProps={{ fontSize: 14, fontWeight: 400 }}
                        />
                      </StyledListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
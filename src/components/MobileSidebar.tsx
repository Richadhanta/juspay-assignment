import React, { useState } from 'react';
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box
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
import { useNavigate } from 'react-router-dom';

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

interface MobileSidebarProps {
  onClose?: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Favorites');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboards']);
  const navigate = useNavigate();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const navigationItems = [
    { icon: PieChartOutlinedIcon, label: 'Overview', hasChildren: false, path: '/' },
    { icon: FolderOpenOutlinedIcon, label: 'Projects', hasChildren: false, path: '/' }
  ];

  const dashboardItems = [
    { icon: PieChartOutlinedIcon, label: 'Default', active: true, path: '/' },
    { icon: ShoppingBagOutlinedIcon, label: 'eCommerce', hasChildren: false, path: '/' },
    { icon: FolderOpenOutlinedIcon, label: 'Projects', hasChildren: false, path: '/' },
    { icon: AutoStoriesOutlinedIcon, label: 'Online Courses', hasChildren: false, path: '/' }
  ];

  const pageItems = [
    { icon: BadgeOutlinedIcon, label: 'User Profile', hasChildren: true, children: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Followers'], path: '/' },
    { icon: BadgeOutlinedIcon, label: 'Account', hasChildren: false, path: '/' },
    { icon: Groups2OutlinedIcon, label: 'Corporate', hasChildren: false, path: '/' },
    { icon: CreateOutlinedIcon, label: 'Blog', hasChildren: false, path: '/' },
    { icon: ChatBubbleOutlinedIcon, label: 'Social', hasChildren: false, path: '/' }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
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
            <StyledListItemButton onClick={() => handleNavigation(item.path)}>
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
            <StyledListItemButton active={item.active} onClick={() => handleNavigation(item.path)}>
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
              <StyledListItemButton onClick={() => {
                if (item.hasChildren) {
                  toggleSection(item.label);
                } else {
                  handleNavigation(item.path);
                }
              }}>
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
                      <StyledListItemButton onClick={() => handleNavigation(item.path)}>
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

      {/* Add Order List navigation */}
      <SectionTitle>Orders</SectionTitle>
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <StyledListItemButton onClick={() => handleNavigation('/order_list')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Order List" 
              primaryTypographyProps={{ fontSize: 14, fontWeight: 400 }}
            />
          </StyledListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MobileSidebar;
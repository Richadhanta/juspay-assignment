import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SidebarIcon from './icons/SidebarIcon';
import StarIcon from './icons/StarIcon';
import SearchIcon from './icons/SearchIcon';
import SunIcon from './icons/SunIcon';
import ClockIcon from './icons/ClockIcon';
import BellIcon from './icons/BellIcon';
import { useAppTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  position: 'static'
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  minHeight: '68px !important',
  paddingLeft: '24px !important',
  paddingRight: '24px !important',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '16px !important',
    paddingRight: '16px !important'
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
    fontSize: '14px',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5)
  }
}));

const BreadcrumbText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary
}));

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNotificationClick }) => {
  useEffect(() => {
    document.title = 'JusPay assignment';
  }, []);
  const { mode, toggleTheme } = useAppTheme();
  const navigate = useNavigate();

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="small" onClick={onMenuClick}>
              <SidebarIcon width={20} height={20} color="currentColor" />
            </IconButton>
            <IconButton size="small">
              <StarIcon width={20} height={20} color="currentColor" />
            </IconButton>
          </Stack>
          <Breadcrumbs separator="/" sx={{ color: 'text.secondary' }}>
            <BreadcrumbText
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => navigate('/')}
            >
              Dashboards
            </BreadcrumbText>
            <BreadcrumbText
              active
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => navigate('/order_list')}
            >
              Default
            </BreadcrumbText>
          </Breadcrumbs>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2.5}>
          <SearchField
            placeholder="Search"
            size="small"
            sx={{ width: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={16} height={16} color="currentColor" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    ⌘/
                  </Typography>
                </InputAdornment>
              )
            }}
          />
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={toggleTheme}>
              <SunIcon width={20} height={20} color="currentColor" />
            </IconButton>
            <IconButton size="small">
              <ClockIcon width={20} height={20} color="currentColor" />
            </IconButton>
            <IconButton size="small" onClick={onNotificationClick}>
              <BellIcon width={20} height={20} color="currentColor" />
            </IconButton>
            <IconButton size="small" onClick={onNotificationClick}>
              <SidebarIcon width={20} height={20} color="currentColor" />
            </IconButton>
          </Stack>
        </Stack>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
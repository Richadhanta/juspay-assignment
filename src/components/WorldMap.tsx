import React from 'react';
import { Paper, Typography, Stack, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { LocationRevenueData } from '../types/dashboard';
import { formatNumber } from '../utils/formatters';

const MapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));

const ResponsiveMapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto',
    overflowY: 'hidden',
    minWidth: 400, // Ensure minimum width for scrolling
    '&::-webkit-scrollbar': {
      height: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[100],
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: 4,
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  },
  // For very small screens (230px)
  '@media (max-width: 280px)': {
    overflowX: 'auto',
    overflowY: 'hidden',
    minWidth: 400,
  }
}));

const MapContentWrapper = styled(Box)(({ theme }) => ({
  minWidth: 350, // Minimum content width
  [theme.breakpoints.up('sm')]: {
    minWidth: 'auto',
  }
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 220,
  marginBottom: 20,
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    height: 240,
    marginBottom: 24,
  },
  [theme.breakpoints.up('lg')]: {
    height: 260,
    marginBottom: 28,
  }
}));

const MapImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.8,
  display: 'block'
});

const LocationItem = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  }
}));

const LocationRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5, 0)
}));

const LocationDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  height: 2,
  borderRadius: 1
}));

const MapDot = styled(Box)<{ top: string; left: string }>(({ theme, top, left }) => ({
  position: 'absolute',
  top,
  left,
  width: 12,
  height: 12,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.background.paper}`,
  zIndex: 2
}));

interface WorldMapProps {
  data: LocationRevenueData[];
}

const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  // Calculate max value for proportional bar widths
  const maxValue = Math.max(...data.map(item => item.value));

  // Approximate positions for cities on a world map (percentage based)
  const cityPositions: Record<string, { top: string; left: string }> = {
    'New York': { top: '35%', left: '25%' },
    'San Francisco': { top: '40%', left: '15%' },
    'Sydney': { top: '75%', left: '85%' },
    'Singapore': { top: '60%', left: '75%' }
  };

  return (
    <MapContainer>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Revenue by Location
      </Typography>
      
      <ResponsiveMapWrapper>
        <MapContentWrapper>
          <MapWrapper>
            <MapImage 
              src="/images/world-map.svg" 
              alt="World Map"
              onLoad={(e) => {
                // Hide fallback when image loads successfully
                const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.map-fallback') as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'none';
                }
              }}
              onError={(e) => {
                // Show fallback if image doesn't load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.map-fallback') as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
            {/* Fallback content if image fails to load */}
            <Box
              className="map-fallback"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}
            >
              <Typography variant="body2" color="text.secondary">
                World Map
              </Typography>
            </Box>
            
            {/* City markers */}
            {data.map((location) => {
              const position = cityPositions[location.city];
              if (!position) return null;
              
              return (
                <MapDot
                  key={location.city}
                  top={position.top}
                  left={position.left}
                  title={`${location.city}: ${formatNumber(location.value)}K`}
                />
              );
            })}
          </MapWrapper>
          
          <Stack spacing={2.5}>
            {data.map((location, index) => {
              const barWidth = (location.value / maxValue) * 100;
              
              return (
                <LocationItem key={location.city}>
                  <LocationRow>
                    <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>
                      {location.city}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>
                      {formatNumber(location.value)}K
                    </Typography>
                  </LocationRow>
                  <LocationDivider 
                    sx={{ 
                      width: `${Math.max(barWidth * 0.6, 20)}%`, // Minimum 20% width for visibility
                      backgroundColor: index === 0 ? '#a8c5da' : 
                                      index === 1 ? '#baedbd' : 
                                      index === 2 ? '#95a4fc' : '#b1e3ff',
                      height: 3,
                      borderRadius: 1.5
                    }} 
                  />
                </LocationItem>
              );
            })}
          </Stack>
        </MapContentWrapper>
      </ResponsiveMapWrapper>
    </MapContainer>
  );
};

export default WorldMap;
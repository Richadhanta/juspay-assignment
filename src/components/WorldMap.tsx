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
  boxShadow: 'none'
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  marginBottom: 16,
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden'
}));

const MapImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.8
});

const LocationItem = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const LocationRow = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4
});

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
      
      <MapWrapper>
        <MapImage 
          src="/images/world-map.svg" 
          alt="World Map"
          onError={(e) => {
            // Fallback if image doesn't load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Fallback content if image fails to load */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            display: 'flex',
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
      
      <Stack spacing={2}>
        {data.map((location, index) => {
          const barWidth = (location.value / maxValue) * 100;
          
          return (
            <LocationItem key={location.city}>
              <LocationRow>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  {location.city}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  {formatNumber(location.value)}K
                </Typography>
              </LocationRow>
              <LocationDivider 
                sx={{ 
                  width: `${Math.max(barWidth * 0.6, 20)}%`, // Minimum 20% width for visibility
                  backgroundColor: index === 0 ? '#a8c5da' : 
                                  index === 1 ? '#baedbd' : 
                                  index === 2 ? '#95a4fc' : '#b1e3ff'
                }} 
              />
            </LocationItem>
          );
        })}
      </Stack>
    </MapContainer>
  );
};

export default WorldMap;
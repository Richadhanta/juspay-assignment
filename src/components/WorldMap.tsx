import React from 'react';
import { Paper, Typography, Stack, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { LocationRevenueData } from '../types/dashboard';
import { formatNumber } from '../utils/formatters';

const MapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none'
}));

const MapWrapper = styled(Box)({
  width: '100%',
  height: 200,
  marginBottom: 16,
  '& svg': {
    width: '100%',
    height: '100%'
  }
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

interface WorldMapProps {
  data: LocationRevenueData[];
}

const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  // Calculate max value for proportional bar widths
  const maxValue = Math.max(...data.map(item => item.value));

  // Geographic coordinates for cities (longitude, latitude)
  const cityCoordinates: Record<string, [number, number]> = {
    'New York': [-74.006, 40.7128],
    'San Francisco': [-122.4194, 37.7749],
    'Sydney': [151.2093, -33.8688],
    'Singapore': [103.8198, 1.3521]
  };

  return (
    <MapContainer>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Revenue by Location
      </Typography>
      
      <MapWrapper>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 200,
            center: [0, 20]
          }}
        >
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5F3FF"
                  stroke="#B3E5FC"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
          {data.map((location) => {
            const coordinates = cityCoordinates[location.city];
            if (!coordinates) return null;
            
            return (
              <Marker key={location.city} coordinates={coordinates}>
                <circle
                  r={15}
                  fill="#1c1c1c"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </Marker>
            );
          })}
        </ComposableMap>
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
import React, { useState } from 'react';
import { Paper, Typography, Stack, Box, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import type { SalesBreakdownData } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatters';
import SalesDetailPopup from '../SalesDetailPopup';

/**
 * Responsive Sales Chart Component
 * Mobile-optimized pie chart with hover pop effects and adaptive sizing
 */

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: 350,
  }
}));

const ChartContentWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  width: '100%',
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
  }
}));

const PieChartWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    transform: 'scale(0.9)',
    transformOrigin: 'center'
  }
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.2),
  width: '100%',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  }
}));

const LegendItem = styled(Stack)<{ isHovered?: boolean }>(({ theme, isHovered }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  backgroundColor: isHovered ? theme.palette.action.hover : 'transparent',
  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    padding: theme.spacing(0.25, 0),
  }
}));

const Dot = styled('span')<{ color: string; isHovered?: boolean }>(({ color, theme, isHovered }) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,
  flexShrink: 0,
  transition: 'all 0.2s ease-in-out',
  transform: isHovered ? 'scale(1.3)' : 'scale(1)',
  boxShadow: isHovered ? `0 0 8px ${color}40` : 'none',
  [theme.breakpoints.down('sm')]: {
    width: 8,
    height: 8,
    marginRight: 6,
  }
}));

const CenterLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '23%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  pointerEvents: 'none',
  zIndex: 10
}));

interface SalesChartProps {
  data: SalesBreakdownData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<SalesBreakdownData | null>(null);
  
  const colorMap = {
    'Direct': theme.palette.primary?.main || '#1c1c1c',
    'Affilliate': theme.palette.success?.main || '#a1e3cb',
    'Sponsored': theme.palette.info?.main || '#95a4fc',
    'E-mail': theme.palette.error?.main || '#b1e3ff'
  };

  // Transform data for MUI X Charts PieChart with hover effects
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.category,
    color: colorMap[item.category]
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const mainPercent = total ? ((data[0].value / total) * 100).toFixed(1) : '0.0';

  // Responsive chart dimensions with hover scaling
  const getChartSize = () => {
    const baseScale = hoveredIndex !== null ? 1.05 : 1;
    if (isMobile) return { 
      width: 140 * baseScale, 
      height: 140 * baseScale, 
      innerRadius: 45, 
      outerRadius: hoveredIndex !== null ? 70 : 65 
    };
    if (isTablet) return { 
      width: 160 * baseScale, 
      height: 160 * baseScale, 
      innerRadius: 52, 
      outerRadius: hoveredIndex !== null ? 80 : 75 
    };
    return { 
      width: 180 * baseScale, 
      height: 180 * baseScale, 
      innerRadius: 60, 
      outerRadius: hoveredIndex !== null ? 92 : 85 
    };
  };

  const chartSize = getChartSize();

  const handleLegendHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLegendLeave = () => {
    setHoveredIndex(null);
  };

  const handlePieClick = (event: any, d: any) => {
    const clickedData = data[d.dataIndex];
    setSelectedData(clickedData);
    setPopupOpen(true);
  };

  const handleLegendClick = (index: number) => {
    const clickedData = data[index];
    setSelectedData(clickedData);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedData(null);
  };

  return (
    <ChartContainer>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          color: 'text.primary',
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          fontWeight: 600
        }}
      >
        Total Sales
      </Typography>
      
      <ChartContentWrapper>
        <PieChartWrapper 
          sx={{ 
            width: chartSize.width, 
            height: chartSize.height,
            transform: hoveredIndex !== null ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: chartSize.innerRadius,
                outerRadius: chartSize.outerRadius,
                paddingAngle: isMobile ? 1 : 2,
                cornerRadius: 2,
                startAngle: 0,
                endAngle: 360,
                cx: chartSize.width / 2,
                cy: chartSize.height / 2,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: chartSize.innerRadius, additionalRadius: -5, color: 'gray' }
              }
            ]}
            width={chartSize.width}
            height={chartSize.height}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            onItemClick={handlePieClick}
            slotProps={{
              legend: { hidden: true },
              pieArc: {
                style: {
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                },
                onMouseEnter: (event, d) => setHoveredIndex(d.dataIndex),
                onMouseLeave: () => setHoveredIndex(null)
              }
            }}
            sx={{
              touchAction: 'pan-x pan-y',
              userSelect: 'none',
              '& .MuiPieArc-root': {
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                '&:hover': {
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  transform: 'scale(1.02)',
                }
              }
            }}
          />
          <CenterLabel>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px', 
                fontWeight: 600, 
                color: 'text.primary',
                lineHeight: 1,
                transition: 'all 0.2s ease-in-out',
                transform: hoveredIndex !== null ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {hoveredIndex !== null 
                ? `${((data[hoveredIndex].value / total) * 100).toFixed(1)}%`
                : `${mainPercent}%`
              }
            </Typography>
          </CenterLabel>
        </PieChartWrapper>
      </ChartContentWrapper>
      
      <LegendContainer>
        {data.map((item, index) => (
          <LegendItem 
            key={item.category}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => handleLegendHover(index)}
            onMouseLeave={handleLegendLeave}
            onClick={() => handleLegendClick(index)}
          >
            <Box display="flex" alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
              <Dot 
                color={colorMap[item.category]} 
                isHovered={hoveredIndex === index}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: hoveredIndex === index ? 600 : 500, 
                  color: 'text.primary',
                  fontSize: isMobile ? '12px' : '14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'font-weight 0.2s ease-in-out'
                }}
              >
                {item.category}
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: hoveredIndex === index ? 600 : 400, 
                color: 'text.primary',
                fontSize: isMobile ? '12px' : '14px',
                minWidth: isMobile ? 50 : 60, 
                textAlign: 'right',
                flexShrink: 0,
                transition: 'font-weight 0.2s ease-in-out'
              }}
            >
              {formatCurrency(item.value)}
            </Typography>
          </LegendItem>
        ))}
      </LegendContainer>

      <SalesDetailPopup
        open={popupOpen}
        onClose={handlePopupClose}
        selectedData={selectedData}
        totalSales={total}
        color={selectedData ? colorMap[selectedData.category] : ''}
      />
    </ChartContainer>
  );
};

export default SalesChart;
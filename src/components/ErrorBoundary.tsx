import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText
}));

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'background.default'
          }}
        >
          <ErrorContainer elevation={3}>
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleReload}
              sx={{ mt: 2 }}
            >
              Refresh Page
            </Button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom>
                  Error Details (Development Only):
                </Typography>
                <Typography 
                  variant="body2" 
                  component="pre" 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    p: 2, 
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.75rem'
                  }}
                >
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </Typography>
              </Box>
            )}
          </ErrorContainer>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Task Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <AppRoutes />
      </Container>
    </Box>
  );
}

export default App;

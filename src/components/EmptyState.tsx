import { Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function EmptyState() {
  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
        borderRadius: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h4" gutterBottom>
        No tasks found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Start by creating your first task and organize your workflow with clarity.
      </Typography>
      <Button component={RouterLink} to="/tasks/new" variant="contained" size="large">
        Create Your First Task
      </Button>
    </Paper>
  );
}

export default EmptyState;

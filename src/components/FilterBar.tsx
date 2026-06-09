import { Box, Grid, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TaskFilters } from '../hooks/useFilteredTasks';

interface FilterBarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  assignees: string[];
}

const priorityOptions = ['All', 'Low', 'Medium', 'High'] as const;

function FilterBar({ filters, onChange, assignees }: FilterBarProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="priority-filter-label">Priority</InputLabel>
                <Select
                  labelId="priority-filter-label"
                  label="Priority"
                  value={filters.priority}
                  onChange={(event) => onChange({ ...filters, priority: event.target.value as TaskFilters['priority'] })}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="assignee-filter-label">Assignee</InputLabel>
                <Select
                  labelId="assignee-filter-label"
                  label="Assignee"
                  value={filters.assignee}
                  onChange={(event) => onChange({ ...filters, assignee: event.target.value as TaskFilters['assignee'] })}
                >
                  <MenuItem value="All">All</MenuItem>
                  {assignees.map((assignee) => (
                    <MenuItem key={assignee} value={assignee}>
                      {assignee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Button
            component={RouterLink}
            to="/tasks/new"
            variant="contained"
            size="large"
            sx={{ px: 4 }}
          >
            New Task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterBar;

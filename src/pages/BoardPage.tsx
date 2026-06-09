import { Box, Typography } from '@mui/material';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { useTasks } from '../hooks/useTasks';
import FilterBar from '../components/FilterBar';
import Board from '../components/Board';
import EmptyState from '../components/EmptyState';

function BoardPage() {
  const { filters, setFilters, filteredTasks, availableAssignees } = useFilteredTasks();
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Project Board
      </Typography>
      <FilterBar filters={filters} onChange={setFilters} assignees={availableAssignees} />
      <Board tasks={filteredTasks} />
    </Box>
  );
}

export default BoardPage;

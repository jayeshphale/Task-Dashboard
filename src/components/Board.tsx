import { Grid, Typography, Box } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTasks } from '../hooks/useTasks';
import TaskColumn from './TaskColumn';
import { TaskStatus } from '../types/task';

interface BoardProps {
  tasks: ReturnType<typeof useTasks>['tasks'];
}

const statuses: { title: string; value: TaskStatus }[] = [
  { title: 'To Do', value: 'To Do' },
  { title: 'In Progress', value: 'In Progress' },
  { title: 'Done', value: 'Done' }
];

function Board({ tasks }: { tasks: ReturnType<typeof useTasks>['tasks'] }) {
  const { dispatch } = useTasks();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    dispatch({ type: 'MOVE_TASK', payload: { id: draggableId, status: newStatus } });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        {statuses.map((status) => (
          <Grid item xs={12} md={6} lg={4} key={status.value}>
            <Box sx={{ height: '100%' }}>
              <TaskColumn title={status.title} tasks={tasks.filter((task) => task.status === status.value)} status={status.value} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
}

export default Board;

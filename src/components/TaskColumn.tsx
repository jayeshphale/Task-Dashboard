import { Paper, Typography, Box } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Task } from '../types/task';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
}

function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  return (
    <Paper elevation={2} sx={{ p: 2, minHeight: 360, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{tasks.length}</Typography>
      </Box>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: 220,
              backgroundColor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
              transition: 'background-color 180ms ease'
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
}

export default TaskColumn;

import { Card, CardContent, Typography, Avatar, Box, Stack } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import { Link as RouterLink } from 'react-router-dom';
import PriorityChip from './PriorityChip';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  index: number;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((segment) => segment[0])
    .join('')
    .toUpperCase();
}

function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          component={RouterLink}
          to={`/tasks/${task.id}`}
          sx={{
            mb: 2,
            textDecoration: 'none',
            color: 'text.primary',
            transform: snapshot.isDragging ? 'scale(1.02)' : 'none',
            boxShadow: snapshot.isDragging ? 6 : 1,
            transition: 'transform 180ms ease, box-shadow 180ms ease'
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>
                {task.title}
              </Typography>
              <PriorityChip priority={task.priority} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: 14 }}>
                {getInitials(task.assignee)}
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

export default TaskCard;

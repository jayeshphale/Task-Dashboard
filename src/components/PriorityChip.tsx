import { Chip } from '@mui/material';
import { TaskPriority } from '../types/task';

interface PriorityChipProps {
  priority: TaskPriority;
}

const priorityColors: Record<TaskPriority, 'default' | 'success' | 'warning' | 'error'> = {
  Low: 'success',
  Medium: 'warning',
  High: 'error'
};

function PriorityChip({ priority }: PriorityChipProps) {
  return <Chip label={priority} color={priorityColors[priority]} size="small" />;
}

export default PriorityChip;

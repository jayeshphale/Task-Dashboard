import { useMemo, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Box, Typography, Snackbar } from '@mui/material';
import TaskForm from '../components/TaskForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { useTasks } from '../hooks/useTasks';
import { TaskFormValues } from '../utils/validation';

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, dispatch } = useTasks();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const task = useMemo(() => tasks.find((item) => item.id === id), [tasks, id]);

  if (!task) {
    return <Navigate to="/" replace />;
  }

  const initialValues: TaskFormValues = {
    title: task.title,
    description: task.description,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate,
    status: task.status
  };

  const handleSubmit = (values: TaskFormValues) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        ...task,
        title: values.title,
        description: values.description,
        priority: values.priority,
        assignee: values.assignee,
        dueDate: values.dueDate ?? task.dueDate,
        status: values.status
      }
    });
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 650);
  };

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (task) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
      navigate('/');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Task Details
      </Typography>
      <TaskForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        onDelete={handleDelete}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Task updated successfully"
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}

export default TaskDetailPage;

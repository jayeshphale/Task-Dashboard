import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Snackbar } from '@mui/material';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { TaskFormValues } from '../utils/validation';

const initialValues: TaskFormValues = {
  title: '',
  description: '',
  priority: 'Medium',
  assignee: '',
  dueDate: new Date().toISOString().split('T')[0],
  status: 'To Do'
};

function CreateTaskPage() {
  const { dispatch } = useTasks();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (values: TaskFormValues) => {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      assignee: values.assignee,
      dueDate: values.dueDate ?? new Date().toISOString().split('T')[0],
      status: values.status
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 650);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Create Task
      </Typography>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Create Task" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Task created successfully"
      />
    </Box>
  );
}

export default CreateTaskPage;

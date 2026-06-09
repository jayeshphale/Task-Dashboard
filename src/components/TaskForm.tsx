import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import { TaskPriority, TaskStatus } from '../types/task';
import { TaskFormValues, TaskFormErrors, validateTaskForm } from '../utils/validation';

interface TaskFormProps {
  initialValues: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  submitLabel: string;
  onDelete?: () => void;
}

function TaskForm({ initialValues, onSubmit, submitLabel, onDelete }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleFieldChange = (field: keyof TaskFormValues, value: string | null) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = () => {
    const validation = validateTaskForm(values);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            value={values.title}
            onChange={(event) => handleFieldChange('title', event.target.value)}
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              label="Priority"
              value={values.priority}
              onChange={(event: SelectChangeEvent<TaskPriority>) => handleFieldChange('priority', event.target.value as TaskPriority)}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={values.description}
            onChange={(event) => handleFieldChange('description', event.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Assignee"
            value={values.assignee}
            onChange={(event) => handleFieldChange('assignee', event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Due Date"
            value={values.dueDate ? new Date(values.dueDate) : null}
            onChange={(date) => handleFieldChange('dueDate', date ? date.toISOString().split('T')[0] : null)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.dueDate),
                helperText: errors.dueDate
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Status"
              value={values.status}
              onChange={(event: SelectChangeEvent<TaskStatus>) => handleFieldChange('status', event.target.value as TaskStatus)}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" onClick={handleSubmit}>
            {submitLabel}
          </Button>
          {onDelete ? (
            <Button variant="outlined" color="error" size="large" onClick={onDelete}>
              Delete Task
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskForm;

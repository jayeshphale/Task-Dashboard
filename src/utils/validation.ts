import { TaskPriority, TaskStatus } from '../types/task';

export interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: string | null;
  status: TaskStatus;
}

export interface TaskFormErrors {
  title?: string;
  dueDate?: string;
}

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const selectedDate = new Date(values.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return errors;
}

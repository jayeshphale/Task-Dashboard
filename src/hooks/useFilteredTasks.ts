import { useMemo, useState } from 'react';
import { useTasks } from './useTasks';
import { Task, TaskPriority } from '../types/task';

export interface TaskFilters {
  priority: 'All' | TaskPriority;
  assignee: 'All' | string;
}

const initialFilters: TaskFilters = {
  priority: 'All',
  assignee: 'All'
};

export function useFilteredTasks() {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);

  const availableAssignees = useMemo(
    () => Array.from(new Set(tasks.map((task) => task.assignee))).sort(),
    [tasks]
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const priorityMatch = filters.priority === 'All' || task.priority === filters.priority;
        const assigneeMatch = filters.assignee === 'All' || task.assignee === filters.assignee;
        return priorityMatch && assigneeMatch;
      }),
    [tasks, filters]
  );

  return {
    filters,
    setFilters,
    filteredTasks,
    availableAssignees
  };
}

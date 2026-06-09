import { useEffect, useReducer, ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { taskReducer, TaskState } from './taskReducer';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/localStorage';
import { TASKS_SEED } from '../utils/constants';

export function TaskProvider({ children }: { children: ReactNode }) {
  const storedTasks = loadTasksFromStorage();
  const initialState: TaskState = { tasks: storedTasks.length > 0 ? storedTasks : TASKS_SEED };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    if (state.tasks.length > 0) {
      saveTasksToStorage(state.tasks);
    }
  }, [state.tasks]);

  return <TaskContext.Provider value={{ ...state, dispatch }}>{children}</TaskContext.Provider>;
}

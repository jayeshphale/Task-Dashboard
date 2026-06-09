import { createContext } from 'react';
import { TaskState, TaskAction } from './taskReducer';

export interface TaskContextProps extends TaskState {
  dispatch: (action: TaskAction) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

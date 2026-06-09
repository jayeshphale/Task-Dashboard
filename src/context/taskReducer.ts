import { Task } from '../types/task';

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { id: string; status: Task['status'] } }
  | { type: 'LOAD_TASKS'; payload: Task[] };

export interface TaskState {
  tasks: Task[];
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task))
      };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'MOVE_TASK':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        )
      };
    case 'LOAD_TASKS':
      return { tasks: action.payload };
    default:
      return state;
  }
}

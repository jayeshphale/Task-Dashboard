import { Task } from '../types/task';
import { STORAGE_KEY } from './constants';

export function loadTasksFromStorage(): Task[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Task[];
    return parsed.map((task) => ({ ...task }));
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

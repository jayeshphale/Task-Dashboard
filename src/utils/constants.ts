import { Task } from '../types/task';

export const STORAGE_KEY = 'task-dashboard-tasks';

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'] as const;
export const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'] as const;

export const TASKS_SEED: Task[] = [
  {
    id: '1',
    title: 'Design Landing Page',
    description: 'Create a new public landing page design with strong visual hierarchy and marketing copy.',
    priority: 'High',
    assignee: 'Ava Patel',
    dueDate: '2026-07-04',
    status: 'To Do',
    createdAt: '2026-06-01T08:00:00.000Z'
  },
  {
    id: '2',
    title: 'Fix Login Bug',
    description: 'Resolve the intermittent authentication failure when users sign in from mobile.',
    priority: 'Medium',
    assignee: 'Liam Chen',
    dueDate: '2026-06-18',
    status: 'In Progress',
    createdAt: '2026-06-02T10:00:00.000Z'
  },
  {
    id: '3',
    title: 'Implement API Integration',
    description: 'Connect the frontend dashboard to the project management API and display live task metrics.',
    priority: 'High',
    assignee: 'Mia Rodriguez',
    dueDate: '2026-06-24',
    status: 'To Do',
    createdAt: '2026-06-03T12:00:00.000Z'
  },
  {
    id: '4',
    title: 'Prepare Sprint Report',
    description: 'Assemble sprint metrics and stakeholder summaries for the executive review.',
    priority: 'Low',
    assignee: 'Noah Smith',
    dueDate: '2026-06-20',
    status: 'Done',
    createdAt: '2026-06-04T14:00:00.000Z'
  },
  {
    id: '5',
    title: 'Review Accessibility',
    description: 'Audit UI components for accessibility compliance and keyboard navigation.',
    priority: 'Medium',
    assignee: 'Sophia Lee',
    dueDate: '2026-06-22',
    status: 'In Progress',
    createdAt: '2026-06-05T09:30:00.000Z'
  },
  {
    id: '6',
    title: 'Build Release Notes',
    description: 'Write and review customer-facing release notes for the next deployment.',
    priority: 'Low',
    assignee: 'Ethan Hall',
    dueDate: '2026-06-25',
    status: 'To Do',
    createdAt: '2026-06-06T11:00:00.000Z'
  },
  {
    id: '7',
    title: 'QA Regression Cycle',
    description: 'Coordinate test cases for the full regression cycle ahead of launch.',
    priority: 'High',
    assignee: 'Olivia Brooks',
    dueDate: '2026-06-19',
    status: 'In Progress',
    createdAt: '2026-06-07T15:30:00.000Z'
  },
  {
    id: '8',
    title: 'Optimize Notification Flow',
    description: 'Reduce latency and redundant notifications for the client update feed.',
    priority: 'Medium',
    assignee: 'Ava Patel',
    dueDate: '2026-06-27',
    status: 'Done',
    createdAt: '2026-06-08T08:20:00.000Z'
  }
];

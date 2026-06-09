import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import AppRoutes from '../routes/AppRoutes';

describe('Task creation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a new task and returns to the board', async () => {
    renderWithProviders(<AppRoutes />, { route: ['/tasks/new'] });

    await screen.findByRole('heading', { name: /create task/i });

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New roadmap task' } });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Write a new roadmap item and review priorities.' }
    });
    fireEvent.change(screen.getByLabelText(/assignee/i), { target: { value: 'Jordan Kim' } });
    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    await screen.findByText(/task created successfully/i);
    await screen.findByRole('heading', { name: /project board/i });
    expect(screen.getByText(/new roadmap task/i)).toBeInTheDocument();
  });
});

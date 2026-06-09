import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import AppRoutes from '../routes/AppRoutes';

describe('Status change', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates task status from detail page and persists on board', async () => {
    renderWithProviders(<AppRoutes />, { route: ['/tasks/1'] });

    await screen.findByRole('heading', { name: /task details/i });

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /status/i }));
    const statusListbox = await screen.findByRole('listbox');
    const doneOption = within(statusListbox).getByRole('option', { name: /done/i });
    fireEvent.click(doneOption);
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await screen.findByText(/task updated successfully/i);
    await screen.findByRole('heading', { name: /project board/i });
    expect(screen.getByText(/Design Landing Page/i)).toBeInTheDocument();
  });
});

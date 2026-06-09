import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import BoardPage from '../pages/BoardPage';

describe('Filtering', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('filters tasks by priority', async () => {
    renderWithProviders(<BoardPage />);

    await userEvent.click(screen.getByLabelText(/priority/i));
    await userEvent.click(screen.getByRole('option', { name: /high/i }));

    expect(screen.getByText(/project board/i)).toBeInTheDocument();
    expect(screen.getByText(/Design Landing Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fix Login Bug/i)).toBeNull();
  });
});

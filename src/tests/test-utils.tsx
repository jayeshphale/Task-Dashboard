import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from '../theme';
import { TaskProvider } from '../context/TaskProvider';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string[];
}

export function renderWithProviders(ui: ReactNode, options?: RenderWithProvidersOptions) {
  const { route, ...renderOptions } = options || {};

  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <TaskProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {route ? <MemoryRouter initialEntries={route}>{children}</MemoryRouter> : <BrowserRouter>{children}</BrowserRouter>}
        </LocalizationProvider>
      </ThemeProvider>
    </TaskProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
  document.documentElement.classList.remove('dark');
});

test('renders the Webzark marketplace home page and changes the shared theme', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /everything your business needs to run/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i }));
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('webzark-theme')).toBe('dark');
});

test('filters saved products by top picks and restores all saved products', () => {
  localStorage.setItem('webzark-wishlist', '[1, 3]');
  window.history.pushState({}, '', '/wishlist');
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /top picks/i }));
  expect(screen.getByText('ThermalPro T80')).toBeInTheDocument();
  expect(screen.queryByText('CounterView 24')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /all items/i }));
  expect(screen.getByText('CounterView 24')).toBeInTheDocument();
});

test('uses client-side navigation so the mobile navigation remains mounted', () => {
  render(<App />);
  const mobileNavigation = screen.getByRole('navigation', { name: /mobile navigation/i });

  fireEvent.click(within(mobileNavigation).getByRole('link', { name: 'Browse' }));

  expect(screen.getByRole('heading', { name: /browse products/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBe(mobileNavigation);
});

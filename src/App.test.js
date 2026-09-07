import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Tailwind welcome page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /tailwind css is working/i })).toBeInTheDocument();
});

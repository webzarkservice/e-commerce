import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Webzark marketplace home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /everything your business needs to run/i })).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText(/Tax Strategy Calculator/i);
  expect(heading).toBeInTheDocument();
});

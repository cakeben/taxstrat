import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders calculator heading inside main content', () => {
  render(<App />);
  const main = screen.getByRole('main');
  const heading = within(main).getByRole('heading', {
    name: /Tax Strategy Calculator/i,
  });
  expect(heading).toBeInTheDocument();
});

test('shows navigation link for the about page', () => {
  render(<App />);
  const aboutLink = screen.getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();
});

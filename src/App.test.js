import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Match List header on /admin/list route', () => {
  // Simulate navigation to the route
  window.history.pushState({}, 'Admin List', '/admin/list');

  // Render App component (already includes routing)
  render(<App />);

  // Expect something specific from that route
  expect(screen.getByText(/match list/i)).toBeInTheDocument();
});

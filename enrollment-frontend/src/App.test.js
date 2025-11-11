import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the College System title', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/college system/i);
  expect(titleElement).toBeInTheDocument();
});

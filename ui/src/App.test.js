import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';

test('renders the website', () => {
  render(<App />);
  const linkElement = screen.getByText('Taskify');
  expect(linkElement).toBeInTheDocument();
});


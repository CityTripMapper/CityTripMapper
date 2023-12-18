import React from 'react'
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest'
import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    const menuComponent = screen.getByTestId('menu-component');
    expect(menuComponent).toBeInTheDocument();
  })

  it('renders Home component', () => {
    render(<App />);
    const homeComponent = screen.getByTestId('home-component');
    expect(homeComponent).toBeInTheDocument();
  });

});

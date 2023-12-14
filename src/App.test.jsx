import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const appComponent = screen.getByTestId('app-component');
  expect(appComponent).toBeInTheDocument();
});

test('renders Menu component', () => {
  render(<App />);
  const menuComponent = screen.getByTestId('menu-component');
  expect(menuComponent).toBeInTheDocument();
});

test('renders Home component', () => {
  render(<App />);
  const homeComponent = screen.getByTestId('home-component');
  expect(homeComponent).toBeInTheDocument();
});

test('renders Map component', () => {
  render(<App />);
  const mapComponent = screen.getByTestId('map-component');
  expect(mapComponent).toBeInTheDocument();
});
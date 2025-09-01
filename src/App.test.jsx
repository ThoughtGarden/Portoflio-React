import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  test('renders navbar', () => {
    renderApp();
    expect(screen.getByText('Movie App')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderApp();
    const main = document.querySelector('.main-content');
    expect(main).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderApp();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';

const renderNavBar = () => {
  return render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};

describe('NavBar', () => {
  test('renders brand link', () => {
    renderNavBar();
    expect(screen.getByText('Movie App')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderNavBar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  test('home link has correct href', () => {
    renderNavBar();
    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('favorites link has correct href', () => {
    renderNavBar();
    const favoritesLink = screen.getByText('Favorites');
    expect(favoritesLink.closest('a')).toHaveAttribute('href', '/favorites');
  });
});
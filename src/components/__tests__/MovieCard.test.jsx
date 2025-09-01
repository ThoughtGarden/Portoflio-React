import { render, screen, fireEvent } from '@testing-library/react';
import { useMovieContext } from '../../contexts/MovieContext';
import MovieCard from '../MovieCard';

jest.mock('../../contexts/MovieContext');

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  release_date: '2023-01-15'
};

const mockContextValue = {
  isFavorite: jest.fn(),
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn()
};

describe('MovieCard', () => {
  beforeEach(() => {
    useMovieContext.mockReturnValue(mockContextValue);
    jest.clearAllMocks();
  });

  test('renders movie information', () => {
    mockContextValue.isFavorite.mockReturnValue(false);
    
    render(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
  });

  test('renders movie poster with correct src', () => {
    mockContextValue.isFavorite.mockReturnValue(false);
    
    render(<MovieCard movie={mockMovie} />);
    
    const img = screen.getByAltText('Test Movie');
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });

  test('adds to favorites when not favorite', () => {
    mockContextValue.isFavorite.mockReturnValue(false);
    
    render(<MovieCard movie={mockMovie} />);
    
    const favoriteBtn = screen.getByRole('button');
    fireEvent.click(favoriteBtn);
    
    expect(mockContextValue.addToFavorites).toHaveBeenCalledWith(mockMovie);
    expect(mockContextValue.removeFromFavorites).not.toHaveBeenCalled();
  });

  test('removes from favorites when is favorite', () => {
    mockContextValue.isFavorite.mockReturnValue(true);
    
    render(<MovieCard movie={mockMovie} />);
    
    const favoriteBtn = screen.getByRole('button');
    fireEvent.click(favoriteBtn);
    
    expect(mockContextValue.removeFromFavorites).toHaveBeenCalledWith(mockMovie.id);
    expect(mockContextValue.addToFavorites).not.toHaveBeenCalled();
  });

  test('applies active class when movie is favorite', () => {
    mockContextValue.isFavorite.mockReturnValue(true);
    
    render(<MovieCard movie={mockMovie} />);
    
    const favoriteBtn = screen.getByRole('button');
    expect(favoriteBtn).toHaveClass('active');
  });

  test('does not apply active class when movie is not favorite', () => {
    mockContextValue.isFavorite.mockReturnValue(false);
    
    render(<MovieCard movie={mockMovie} />);
    
    const favoriteBtn = screen.getByRole('button');
    expect(favoriteBtn).not.toHaveClass('active');
  });
});
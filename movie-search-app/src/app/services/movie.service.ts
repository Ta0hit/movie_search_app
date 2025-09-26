import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie, MovieResponse } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiKey = 'a0f591a5';
  private readonly apiUrl = 'https://www.omdbapi.com/?i=tt3896198&apikey=a0f591a5';
  private readonly imageUrl = 'https://image.tmdb.org/t/p/w500';

  // Mock data for development
  private readonly mockMovies: Movie[] = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      release_date: '1994-09-23',
      vote_average: 9.3,
      vote_count: 2343110,
      genre_ids: [18, 80]
    },
    {
      id: 2,
      title: 'The Godfather',
      overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      release_date: '1972-03-14',
      vote_average: 9.2,
      vote_count: 1731428,
      genre_ids: [18, 80]
    },
    {
      id: 3,
      title: 'The Dark Knight',
      overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      release_date: '2008-07-16',
      vote_average: 9.0,
      vote_count: 2654233,
      genre_ids: [18, 28, 80, 53]
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      release_date: '1994-09-10',
      vote_average: 8.9,
      vote_count: 2056331,
      genre_ids: [80, 18]
    },
    {
      id: 5,
      title: 'Forrest Gump',
      overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
      poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      release_date: '1994-06-23',
      vote_average: 8.8,
      vote_count: 2201123,
      genre_ids: [35, 18, 10749]
    }
  ];

  // Signal to hold current movies
  movies = signal<Movie[]>(this.mockMovies);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  // Get popular movies (using mock data for now)
  getPopularMovies(): Observable<MovieResponse> {
    return of({
      page: 1,
      results: this.mockMovies,
      total_pages: 1,
      total_results: this.mockMovies.length
    });
  }

  // Search movies by title (filtering mock data for now)
  searchMovies(query: string): Observable<MovieResponse> {
    const filteredMovies = this.mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return of({
      page: 1,
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length
    });
  }

  // Helper method to get full image URL
  getImageUrl(path: string | undefined): string {
    if (!path) return '/assets/no-poster.jpg'; // fallback image
    return this.imageUrl + path;
  }

  // Update movies signal
  updateMovies(movies: Movie[]): void {
    this.movies.set(movies);
  }

  // Set loading state
  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  // Set error state
  setError(error: string | null): void {
    this.error.set(error);
  }

  getPopularMoviesFromAPI(): Observable<MovieResponse> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<MovieResponse>(url);
  }

  searchMoviesFromAPI(query: string): Observable<MovieResponse> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`;
    return this.http.get<MovieResponse>(url);
  }
}

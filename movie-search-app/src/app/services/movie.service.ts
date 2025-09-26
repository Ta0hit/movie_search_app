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

  // mock data
  private readonly mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Fight Club',
      overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.',
      poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      release_date: '1999-10-15',
      vote_average: 8.8,
      vote_count: 2100000,
      genre_ids: [18, 53]
    },
    {
      id: 2,
      title: 'Inception',
      overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      release_date: '2010-07-16',
      vote_average: 8.8,
      vote_count: 2200000,
      genre_ids: [28, 878, 53]
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
      title: 'Ocean\'s Eleven',
      overview: 'Danny Ocean and his ten accomplices plan to rob three Las Vegas casinos simultaneously.',
      poster_path: '/hQQCdZrsHtZyR6NbKH2YyCqd2fR.jpg',
      release_date: '2001-12-07',
      vote_average: 7.8,
      vote_count: 1800000,
      genre_ids: [80, 53, 35]
    }
  ];

  // Signal to hold current movies
  movies = signal<Movie[]>(this.mockMovies);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  getPopularMovies(): Observable<MovieResponse> {
    return of({
      page: 1,
      results: this.mockMovies,
      total_pages: 1,
      total_results: this.mockMovies.length
    });
  }

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

  getImageUrl(path: string | undefined): string {
    if (!path) return '/assets/no-poster.jpg'; // fallback image
    return this.imageUrl + path;
  }

  updateMovies(movies: Movie[]): void {
    this.movies.set(movies);
  }

  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }
}

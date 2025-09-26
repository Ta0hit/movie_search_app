import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent, MovieListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movie-search-app');

  constructor(private readonly movieService: MovieService) {}

  onSearch(query: string): void {
    this.movieService.setLoading(true);
    this.movieService.setError(null);

    this.movieService.searchMovies(query).subscribe({
      next: (response) => {
        this.movieService.updateMovies(response.results);
        this.movieService.setLoading(false);
      },
      error: (error) => {
        console.error('Error searching movies:', error);
        this.movieService.setError('Failed to search movies. Please try again.');
        this.movieService.setLoading(false);
      }
    });
  }

  onClearSearch(): void {
    this.movieService.setLoading(true);
    this.movieService.setError(null);

    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movieService.updateMovies(response.results);
        this.movieService.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.movieService.setError('Failed to load movies. Please try again.');
        this.movieService.setLoading(false);
      }
    });
  }
}

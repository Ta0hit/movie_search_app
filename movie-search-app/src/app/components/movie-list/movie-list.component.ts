import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieModalComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies = signal<Movie[]>([]);
  selectedMovie: Movie | null = null;
  isModalVisible = false;

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    // Subscribe to the service's movies signal
    this.movies.set(this.movieService.movies());
  }

  loadMovies(): void {
    this.movieService.setLoading(true);
    this.movieService.setError(null);

    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movieService.updateMovies(response.results);
        this.movies.set(response.results);
        this.movieService.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.movieService.setError('Failed to load movies. Please try again.');
        this.movieService.setLoading(false);
      }
    });
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }

  onMovieClick(movie: Movie): void {
    this.selectedMovie = movie;
    this.isModalVisible = true;
  }

  onCloseModal(): void {
    this.isModalVisible = false;
    this.selectedMovie = null;
  }
}

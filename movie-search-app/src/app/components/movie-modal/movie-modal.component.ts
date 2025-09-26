import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.css'
})
export class MovieModalComponent {
  @Input() movie: Movie | null = null;
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private readonly movieService: MovieService) {}

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getImageUrl(posterPath: string | undefined): string {
    return this.movieService.getImageUrl(posterPath);
  }

  formatReleaseDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatVoteCount(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  onImageError(event: any): void {
    const target = event.target;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjE1MCIgeT0iMjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0NDQ0NDQyIvPgo8dGV4dCB4PSIyMDAiIHk9IjM4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4cHgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
  }
}

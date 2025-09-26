import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  constructor(private readonly movieService: MovieService) {}

  getImageUrl(posterPath: string | undefined): string {
    return this.movieService.getImageUrl(posterPath);
  }

  onImageError(event: any): void {
    // Replace broken image with placeholder
    const target = event.target;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjEwMCIgeT0iMTUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0NDQ0NDQyIvPgo8dGV4dCB4PSIxNTAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0cHgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    target.alt = 'No poster available';
  }

  formatReleaseDate(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  formatVoteCount(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  getShortOverview(overview: string): string {
    if (overview.length <= 120) {
      return overview;
    }
    return overview.substring(0, 120) + '...';
  }
}

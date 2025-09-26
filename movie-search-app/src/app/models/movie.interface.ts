export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  adult?: boolean;
  backdrop_path?: string;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

import { Credits } from 'app/movie/credits';
import { Trailers } from 'app/movie/trailers';
import { Pageable } from 'app/shared/pageable';
import { Review } from 'app/movie/review';

export class Movie {
    id: number;
    backdrop_path: string;
    genre_ids: number[];
    credits: Credits;
    trailers: Trailers;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    vote_average: number;
    vote_count: number;
    tagline: string;
    similar: Pageable<Movie>;
    reviews: Pageable<Review>;
}


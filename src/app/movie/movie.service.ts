import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Movie } from 'app/movie/movie';
import { ApiService } from 'app/api/api.service';
import { Genre } from 'app/genres/genre';
import { Pageable } from 'app/shared/pageable';

@Injectable()
export class MovieService {
    constructor(private api: ApiService) { }

    getMovieGenres(): Observable<Genre[]> {
        return this.api.get('genre/movie/list')
            .map(res => res.json().genres as Genre[])
            .catch(this.handleError);
    }

    getMoviesForGenre(genreId: number, page?: number): Observable<Pageable<Movie>> {
        page = page || 1;
        return this.api.get(`genre/${genreId}/movies`, new Map([['page', page]]))
            .map(res => res.json() as Pageable<Movie>)
            .catch(this.handleError);
    }

    getMovies(): Observable<Movie[]> {
        return this.api.get('movie/now_playing')
            .map(res => res.json().results as Movie[])
            .catch(this.handleError);
    }

    getMovie(id: number): Observable<Movie> {
        return this.api.get(`movie/${id}`, new Map([['append_to_response', 'trailers,credits,similar,reviews']]))
            .map(res => res.json() as Movie)
            .catch(this.handleError);
    }

    search(term: string): Observable<Movie[]> {
        const searchParams = new Map<string, string>();
        searchParams.set('query', term);
        searchParams.set('sort_by', 'release_date.desc');
        searchParams.set('page', '1');

        return this.api
            .get('search/movie', searchParams)
            .map(response => response.json().results as Movie[])
            .catch(this.handleError);
    }

    getFavorites(): number[] {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    setFavorites(favorites: number[]) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // TODO: add real error handling
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

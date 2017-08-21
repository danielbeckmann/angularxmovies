import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/movie/movie';
import { MovieService } from 'app/movie/movie.service';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';

@Component({
    selector: 'app-movies',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MoviesListComponent implements OnInit {
    movies: Movie[];
    orderBy = 'release_date';

    constructor(private movieService: MovieService) {
        this.movies = [];
    }

    ngOnInit() {
        this.getMovies();
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe((movies) => {
            this.movies = movies;
            this.sort(this.orderBy);
        });
    }

    sort(property: string): void {
        let order = 1;
        if (property.charAt(0) === '-') {
            order = -1;
            property = property.substr(1);
        }

        this.movies.sort(function (left, right) {
            if (left[property] < right[property]) {
                return -(order);
            }

            if (left[property] > right[property]) {
                return order;
            }

            return 0;
        });
    }
}

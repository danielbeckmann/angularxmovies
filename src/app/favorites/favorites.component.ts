import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/movie/movie';
import { MovieService } from 'app/movie/movie.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-favorites',
    templateUrl: '../movie-list/movie-list.component.html',
    styleUrls: ['../movie-list/movie-list.component.scss']
})
export class FavoritesComponent implements OnInit {
    movies: Movie[];
    orderBy = 'release_date';

    constructor(private movieService: MovieService) {
        this.movies = [];
    }

    ngOnInit() {
        this.getFavoriteMovies();
    }

    getFavoriteMovies(): void {
        const favoriteMovies = this.movieService.getFavorites();
        const requests: Observable<Movie>[] = [];

        for (let i = 0; i < favoriteMovies.length; i++) {
            requests.push(this.movieService.getMovie(favoriteMovies[i]));
        }

        Observable.forkJoin(requests)
            .subscribe(movies => {
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

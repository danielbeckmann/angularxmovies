import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { MovieService } from 'app/movie/movie.service';
import { Movie } from 'app/movie/movie';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
    movie: Movie;

    constructor(private movieService: MovieService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.movieService.getMovie(+params['id']))
            .subscribe(movie => this.movie = movie);
    }

    goBack(): void {
        this.location.back();
    }

    toggleFavorite(): void {
        const favorites = this.movieService.getFavorites();

        if (this.isFavorite()) {
            const index = favorites.indexOf(this.movie.id);
            favorites.splice(index, 1);
        } else {
            favorites.push(this.movie.id);
        }

        this.movieService.setFavorites(favorites);
    }

    isFavorite(): Boolean {
        const favorites = this.movieService.getFavorites();
        return favorites.indexOf(this.movie.id) > -1;
    }
}

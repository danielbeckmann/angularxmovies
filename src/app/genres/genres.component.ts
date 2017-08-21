import { Component, OnInit } from '@angular/core';
import { MovieService } from 'app/movie/movie.service';
import { Genre } from 'app/genres/genre';

@Component({
    selector: 'app-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
    genres: Genre[];

    constructor(private movieService: MovieService) {
        this.genres = [];
    }

    ngOnInit() {
        this.getGenres();
    }

    getGenres(): void {
        this.movieService.getMovieGenres().subscribe((genres) => {
            this.genres = genres;
        });
    }
}

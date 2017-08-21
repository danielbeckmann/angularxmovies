import { Component, OnInit } from '@angular/core';
import { Genre } from 'app/genres/genre';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from 'app/movie/movie.service';
import { Movie } from 'app/movie/movie';

@Component({
    selector: 'app-genre-detail',
    templateUrl: './genre-detail.component.html',
    styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent implements OnInit {
    genre: string;
    genreId: number;
    movies: Movie[];

    totalItems = 0;
    itemsPerPage = 20;
    currentPage = 1;

    constructor(private movieService: MovieService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.genre = params['name'];
            this.genreId = +params['id'];
        });

        this.getMovies(1);
    }

    getMovies(page: number) {
        this.movieService.getMoviesForGenre(this.genreId, page).subscribe((pages) => {
            this.movies = pages.results;

            this.totalItems = pages.total_results;
            this.currentPage = pages.page;
            this.itemsPerPage = pages.total_results / pages.total_pages;
        });
    }

    pageChanged(event: any): void {
        this.getMovies(event.page);
    }
}

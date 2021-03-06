import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'app/movie/movie';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
    @Input() movie: Movie;

    constructor() { }

    ngOnInit() {
    }
}

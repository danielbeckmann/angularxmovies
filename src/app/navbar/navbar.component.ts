import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MovieService } from 'app/movie/movie.service';
import { Movie } from 'app/movie/movie';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isCollapsed = true;
    movies: Observable<Movie[]>;
    searchTerms = new BehaviorSubject<string>('');

    constructor(private movieService: MovieService, private router: Router) { }

    ngOnInit() {
        this.movies = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term ? this.movieService.search(term) : Observable.of<Movie[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Movie[]>([]);
            });
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    clearResults(searchBox) {
        this.movies = Observable.of<Movie[]>([]);
        searchBox.value = '';
    }
}

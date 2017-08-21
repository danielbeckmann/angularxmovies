import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from 'app/movie-list/movie-list.component';
import { MovieDetailComponent } from 'app/movie-detail/movie-detail.component';
import { GenresComponent } from 'app/genres/genres.component';
import { FavoritesComponent } from 'app/favorites/favorites.component';
import { GenreDetailComponent } from 'app/genre-detail/genre-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        component: MoviesListComponent
    },
    {
        path: 'movies/:id',
        component: MovieDetailComponent
    },
    {
        path: 'genres',
        component: GenresComponent
    },
    {
        path: 'genres/:id/:name',
        component: GenreDetailComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

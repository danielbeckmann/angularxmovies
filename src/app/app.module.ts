import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesListComponent } from './movie-list/movie-list.component';
import { MovieService } from 'app/movie/movie.service';
import { GenresComponent } from './genres/genres.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from 'app/api/api.service';
import { ApiImagePipe } from './api/api-image.pipe';
import { RatingPipe } from './movie/rating.pipe';
import { CollapseModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { MovieComponent } from './movie/movie.component';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SharedModule } from 'app/shared/shared.module';
import { SafePipe } from 'app/shared/safe.pipe';
import { YoutubeEmbedPipe } from 'app/shared/youtube-embed.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MoviesListComponent,
        GenresComponent,
        MovieDetailComponent,
        ApiImagePipe,
        RatingPipe,
        MovieComponent,
        FavoritesComponent,
        GenreDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        RouterModule,
        SharedModule,
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        SlimLoadingBarModule.forRoot()
    ],
    providers: [ApiService, MovieService],
    bootstrap: [AppComponent]
})
export class AppModule { }

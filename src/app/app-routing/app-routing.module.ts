import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';


const routes: Routes = [
  { path: 'films', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: 'show/:id', component: ShowDetailComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: '**', redirectTo: '/films', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {  
}
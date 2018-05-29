import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';


const routes: Routes = [
  { path: 'films', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: '**', redirectTo: '/films', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {  
}
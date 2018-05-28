import { MoviesComponent } from "./movies/movies.component";
import { Routes } from '@angular/router';

export const routerConfig: Routes = [
    {
        path: 'films',
        component: MoviesComponent
    },
    {
        path: '',
        redirectTo: '/films',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/films',
        pathMatch: 'full'
    }
];

/**
 * 
 *     {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'courses',
        component: CoursesComponent
    },

 * 
 */
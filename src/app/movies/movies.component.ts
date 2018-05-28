import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(private kodiService: KodiService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.kodiService.getMovies()
    .subscribe(kodiMovies => this.movies = kodiMovies );
  }

}

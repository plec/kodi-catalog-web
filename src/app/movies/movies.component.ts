import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(private kodiService: KodiService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.messageService.add("Movie component : call get movies");
    this.kodiService.getMovies()
    .subscribe(kodiMovies => this.movies = kodiMovies );
  }

}

import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';

import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';
import { MessageService } from '../message.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  nbElement: number;
  length: number;
  nbPages: number;
  pageEvent: PageEvent;
  pageIndex: number;

  constructor(private kodiService: KodiService,
    private messageService: MessageService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.nbElement = this.dataService.getNbElementParPage();
    this.initPages();
    this.getMovies();
  }

  getMovies(): void {
    this.messageService.add("Movie component : call get movies");
    this.kodiService.getMovies()
    .subscribe(kodiMovies => this.movies = kodiMovies );

  }

  initPages(): void {
    this.messageService.add("Movie component : call nb of movies");
    this.kodiService.getNbMovies()
    .subscribe(kodiNbMovies => {
      this.length = kodiNbMovies
      this.nbPages = this.length / (+this.nbElement);
      this.messageService.add("length: " + this.length);
    } );
  }

  changeValueElementParPage() {
    this.messageService.add(" MenuComponent : changeValueElementParPage by function : " + this.nbElement);
    this.dataService.setNbElementParPage(this.nbElement);
    this.nbPages = this.length / (+this.nbElement);
    this.getMovies();
  }

  changeValueAndUpdate() {
    this.messageService.add(" MenuComponent : changeValueAnd update : ");
    this.dataService.setNbElementParPage(this.pageEvent.pageSize);
    this.dataService.setPageIndex(this.pageEvent.pageIndex);
    this.nbPages = this.length / (+this.nbElement);
    this.getMovies();
  }

}

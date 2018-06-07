import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';

import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';
import { MessageService } from '../message.service';
import { PaginationInfoService } from '../paginationInfo.service';
import { Router } from '@angular/router';
import { PaginationInfo } from '../model/paginationInfo';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  genres: string[];
  tri: string;
  selectedGenre: string;
  selectedTitle: string;
  
  nbElement: number;
  length: number;
  nbPages: number;
  pageIndex: number;

  pageEvent: PageEvent;
  
  constructor(private kodiService: KodiService,
    private messageService: MessageService,
    private paginationInfoService: PaginationInfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initPages();
  }

  private getMediaType() {
    let mediaType: string 
    if ("/series" === this.router.url) {
      mediaType = "tvshows";
    } else {
      mediaType = "movies";
    }
    return mediaType;
  }

  getKodiMedia(): void {
    this.messageService.add("Movie component : call get movies");
    this.kodiService.getMovies(this.getMediaType(), this.selectedGenre, this.selectedTitle)
    .subscribe(kodiMovies => this.movies = kodiMovies );
  }

  changeTri(): void {
    this.kodiService.setTri(this.tri);
    this.getKodiMedia();
  }
  changeGenre(): void {
    this.initPages();
  }
  changeTitle(): void {
    this.initPages();

  }

  initPages(): void {
    console.log("need init : " + this.kodiService.needReset());
    if (this.kodiService.needReset()) {
      this.tri = "title";
      this.kodiService.setTri(this.tri);
      this.paginationInfoService.resetPaginationInfo();
      this.nbElement = this.paginationInfoService.getNbElementParPage();
      this.pageIndex = 0;
    } else {
      this.nbElement = this.paginationInfoService.getNbElementParPage();
      this.pageIndex = this.paginationInfoService.getPageIndex();
    }
    this.kodiService.getGenres(this.getMediaType()).subscribe(genres => {
      this.genres = genres;
    });
    this.kodiService.getNbMovies(this.getMediaType(), this.selectedGenre, this.selectedTitle)
    .subscribe(kodiNbMovies => {
      this.length = kodiNbMovies
      this.nbPages = this.length / (+this.nbElement);
    } );
  this.getKodiMedia();
  //set init to true for next init page
  this.kodiService.setInit("O");
  }

  changeValueAndUpdate() {
    this.messageService.add(" MenuComponent : changeValueAnd update : ");
    this.paginationInfoService.setNbElementParPage(this.pageEvent.pageSize);
    this.paginationInfoService.setPageIndex(this.pageEvent.pageIndex);
    this.nbPages = this.length / (+this.nbElement);
    this.getKodiMedia();
  }

}

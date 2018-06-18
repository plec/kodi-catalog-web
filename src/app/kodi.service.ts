import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './model/movie';
import { MessageService } from './message.service';
import {PaginationInfoService} from './paginationInfo.service';
import { environment } from '../environments/environment';
import { Show } from './model/show';

@Injectable({
  providedIn: 'root'
})
export class KodiService {
  
  tri: string;
  format: string;

  init: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private paginationInfoService: PaginationInfoService) { }

  getMovies(mediaType: string, genre: string, titre: string, format: string): Observable<Movie[]> {
    let index = this.paginationInfoService.getNbElementParPage() * this.paginationInfoService.getPageIndex();
    this.messageService.add('KodiService: fetched '+  mediaType +' with ' + this.paginationInfoService.getNbElementParPage() + ' media per pages at index ' + index );
    let serviceUrl = environment.kodiApiUrl
      + '/' +  mediaType;
    if (genre && genre != "") {
      serviceUrl += '/genre/'+ genre;
    }
    if (titre && titre != "") {
      serviceUrl += '/title/'+ titre;
    }
    if (format && format != "") {
      serviceUrl += '/format/'+ format;
    }
    serviceUrl += '/'+ index
      +'/' + this.paginationInfoService.getNbElementParPage()
      + '/' + this.getTri();
      console.log("call getMovies " + serviceUrl);
    this.messageService.add("Call HTTP GET " + serviceUrl);
    return this.http.get<Movie[]>(serviceUrl)
    .pipe(
      catchError(this.handleError('getMovies', []))
    );
  }
  getNbMovies(mediaType: string, genre: string, titre: string, format: string): Observable<number> {
    this.messageService.add('KodiService: fetched total number of movies');
    let serviceUrl = environment.kodiApiUrl
      + '/'+  mediaType
      +'/count';
    if (genre && genre != "") {
     serviceUrl += '/genre/'+ genre;
    }
    if (titre && titre != "") {
      serviceUrl += '/title/'+ titre;
     }
     if (format && format != "") {
      serviceUrl += '/format/'+ format;
     }
      this.messageService.add("Call HTTP GET " + serviceUrl);    
    return this.http.get<number>(serviceUrl)
    .pipe(
      catchError(this.handleError('getNbMovies', 0))
    );
  }
  getGenres(mediaType: string): Observable<string[]> {
    this.messageService.add('KodiService: fetched genres '+  mediaType );
    let serviceUrl = environment.kodiApiUrl + '/genres';
    this.messageService.add("Call HTTP GET " + serviceUrl);
    return this.http.get<string[]>(serviceUrl)
    .pipe(
      catchError(this.handleError('getGenre', []))
    );
  }
  getShow(id: string): Observable<Show> {
    this.messageService.add('KodiService: fetched tv show');
    let serviceUrl = environment.kodiApiUrl + '/tvshows/' + id;
    this.messageService.add("Call HTTP GET " + serviceUrl);    
    return this.http.get<Show>(serviceUrl)
    .pipe(
      catchError(this.handleError('getShow', new Show()))
    );

  }
  getMovie(id: string): Observable<Movie> {
    this.messageService.add('KodiService: fetched movie');
    let serviceUrl = environment.kodiApiUrl + '/movie/' + id;
    this.messageService.add("Call HTTP GET " + serviceUrl);    
    return this.http.get<Movie>(serviceUrl)
    .pipe(
      catchError(this.handleError('getMovie', new Movie()))
    );

  }
  getTri() {
    if ("Date" == this.tri || "date" == this.tri || "dateAdded" == this.tri) {
      return "dateAdded";
    } else {
      return "title";
    }
  }
  setTri(newTri: string) {
    this.tri = newTri;
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
  }
  needReset() :boolean {
    if ("N" == this.init) {
      return false;
    }
    return true;
  }
  setInit(newData: string) {
    this.init = newData;
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

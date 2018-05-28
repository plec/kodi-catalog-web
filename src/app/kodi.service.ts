import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './model/movie';
import { MessageService } from './message.service';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class KodiService {

//  private kodiApiUrl = 'http://192.168.1.47:8280/api/';  // URL to web api

  private kodiApiUrl = 'http://localhost:8080/api/';  // URL to web api
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private dataService: DataService) { }

  getMovies(): Observable<Movie[]> {
    let index = this.dataService.getNbElementParPage() * this.dataService.getPageIndex();
    this.messageService.add('KodiService: fetched movies with ' + this.dataService.getNbElementParPage() + ' movies per pages at index ' + index );
    return this.http.get<Movie[]>(this.kodiApiUrl + '/movies/'+ index
    +'/' + this.dataService.getNbElementParPage())
    .pipe(
      catchError(this.handleError('getMovies', []))
    );
  }
  getNbMovies(): Observable<number> {
    this.messageService.add('KodiService: fetched total number of movies');
    return this.http.get<number>(this.kodiApiUrl + '/movies/count')
    .pipe(
      catchError(this.handleError('getNbMovies', 0))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
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

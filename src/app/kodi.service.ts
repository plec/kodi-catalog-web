import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from './model/movie';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KodiService {

//  private kodiApiUrl = 'http://192.168.1.47:8280/api/';  // URL to web api

  private kodiApiUrl = 'http://localhost:8080/api/';  // URL to web api
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Movie[]>(this.kodiApiUrl + '/movies/0/10')
    .pipe(
      catchError(this.handleError('getMovies', []))
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

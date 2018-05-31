import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './model/movie';
import { MessageService } from './message.service';
import {PaginationInfoService} from './paginationInfo.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KodiService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private paginationInfoService: PaginationInfoService) { }

  getMovies(mediaType: string): Observable<Movie[]> {
    let index = this.paginationInfoService.getNbElementParPage() * this.paginationInfoService.getPageIndex();
    this.messageService.add('KodiService: fetched '+  mediaType +' with ' + this.paginationInfoService.getNbElementParPage() + ' media per pages at index ' + index );
    let serviceUrl = environment.kodiApiUrl + '/'+  mediaType +'/'+ index
    +'/' + this.paginationInfoService.getNbElementParPage();
    this.messageService.add("Call HTTP GET " + serviceUrl);
    return this.http.get<Movie[]>(serviceUrl)
    .pipe(
      catchError(this.handleError('getMovies', []))
    );
  }
  getNbMovies(mediaType: string): Observable<number> {
    this.messageService.add('KodiService: fetched total number of movies');
    let serviceUrl = environment.kodiApiUrl + '/'+  mediaType +'/count';
    this.messageService.add("Call HTTP GET " + serviceUrl);    
    return this.http.get<number>(serviceUrl)
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

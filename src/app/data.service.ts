import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { PaginationInfo } from './model/paginationInfo';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly DEFAULT_ELEMENT_PAR_PAGE = 8;

  nbElementParPage: number
  pageIndex: number

  kodiMediaType: string

  resetPaginationInfo() {
    this.nbElementParPage = this.DEFAULT_ELEMENT_PAR_PAGE;
    this.pageIndex = 0;
  }

  getNbElementParPage() {
    this.messageService.add("DataService (1/2) : get nb element par page " + this.nbElementParPage);

    if (!this.nbElementParPage) {
      this.nbElementParPage = 4;
    }
    this.messageService.add("DataService (2/2) : get nb element par page " + this.nbElementParPage);
    return this.nbElementParPage;
  }

  setNbElementParPage(newData) {
    this.messageService.add("DataService : set nb element par page " + newData);
    this.nbElementParPage = newData;
  }

  setPageIndex(newData: number) {
    this.pageIndex = newData
  }

  getPageIndex() {
    if (!this.pageIndex) {
      this.pageIndex = 0;
    }
    return this.pageIndex;
  }
  setKodiMediaType(newData: string) {
    this.messageService.add("DataService : set kodiMediaType " + newData);
    if(newData.toUpperCase() === "SERIES"
    || newData.toUpperCase() === "SERIE"
    || newData.toUpperCase() === "TVSHOW"
    || newData.toUpperCase() === "TVSHOWS")
      this.kodiMediaType = "tvshows";
    else {
      this.kodiMediaType = "movies";
    }
  }

  getKodiMediaType() {
    if (!this.kodiMediaType) {
      this.kodiMediaType = "movies";
    }
    this.messageService.add("DataService : get kodiMediaType " + this.kodiMediaType);
    return this.kodiMediaType;
  }

  constructor(private messageService: MessageService) { 
  }
}
 
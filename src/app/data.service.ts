import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  nbElementParPage: number
  pageIndex: number

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


  constructor(private messageService: MessageService) { 
  }
}
 
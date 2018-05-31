import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { PaginationInfo } from './model/paginationInfo';
@Injectable({
  providedIn: 'root'
})
export class PaginationInfoService {

  readonly DEFAULT_ELEMENT_PAR_PAGE = 8;
  readonly DEFAULT_PAGE_INDEX = 0;

  nbElementParPage: number
  pageIndex: number

  kodiMediaType: string

  resetPaginationInfo() {
    this.nbElementParPage = this.DEFAULT_ELEMENT_PAR_PAGE;
    this.pageIndex = this.DEFAULT_PAGE_INDEX;
  }

  getNbElementParPage() {
    if (!this.nbElementParPage) {
      this.nbElementParPage = this.DEFAULT_ELEMENT_PAR_PAGE;
    }
    return this.nbElementParPage;
  }

  setNbElementParPage(newData) {
    this.nbElementParPage = newData;
  }

  setPageIndex(newData: number) {
    this.pageIndex = newData
  }

  getPageIndex() {
    if (!this.pageIndex) {
      this.pageIndex = this.DEFAULT_PAGE_INDEX;
    }
    return this.pageIndex;
  }

  constructor(private messageService: MessageService) { 
  }
}
 
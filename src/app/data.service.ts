import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nbElementParPage: string

  getNbElementParPage() {
    return this.nbElementParPage;
  }

  setNbElementParPage(newData) {
    this.nbElementParPage = newData;
  }

  constructor() { 
    this.setNbElementParPage("10");
  }
}
 
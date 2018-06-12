import { Component, OnInit } from '@angular/core';

import { ChromecastService } from '../chromecast.service';

@Component({
  selector: 'ng-cast',
  templateUrl: './chromecast.component.html',
  styleUrls: [
    './chromecast.component.css'
  ]
})
export class ChromecastComponent implements OnInit {
  castingStatus: Object;
  constructor(
    private chromecastService: ChromecastService
  ) { }

  ngOnInit() {

    let script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
    window['document'].body.appendChild(script);

    let chromecastService = this.chromecastService;
    window['__onGCastApiAvailable'] = function (isAvailable) {
      if (isAvailable) {
        chromecastService.initializeCastApi();
      }
    };

    this.castingStatus = this.chromecastService.getStatus();
  }

  openSession() {
    this.chromecastService.discoverDevices();
  }

  closeSession() {
    this.chromecastService.stop();
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChromecastComponent } from './chromecast/chromecast.component';
import { ChromecastService } from './chromecast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ChromecastComponent],
  providers: [ChromecastService],
  declarations: [ChromecastComponent]
})
export class ChromecastModule { }

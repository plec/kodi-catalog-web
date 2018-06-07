import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Show } from '../model/show';
import { KodiService } from '../kodi.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {


  @Input() show: Show;

  constructor(private route: ActivatedRoute,
    private kodiService: KodiService,
    private location: Location) { }

  ngOnInit() {
    this.getShow();
  }

  getShow(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.kodiService.getShow(id)
      .subscribe(show => this.show = show);
  }

  goBack(): void {
    this.location.back();
  }

}

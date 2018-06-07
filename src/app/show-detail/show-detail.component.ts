import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Show } from '../model/show';
import { Episode } from '../model/episode';
import { KodiService } from '../kodi.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  selectedSaison: string;
  seasons: string[];
  episodes: Episode[];
  totalEpisodes: number;

  @Input() show: Show;

  constructor(private route: ActivatedRoute,
    private kodiService: KodiService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getShow();
  }

  getShow(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("get show " + id)
    this.kodiService.getShow(id)
      .subscribe(
        show => {
          this.show = show;
          this.seasons = show.seasons;
          this.totalEpisodes = +show.totalEpisodes;
      });
  }

  goBack(): void {
    this.kodiService.setInit("N");
    this.router.navigate(['/series']);
  }
  changeSaison() {
    this.episodes = (this.show.episodes[this.selectedSaison]);
    this.episodes.sort((n1,n2) => {
      if (+n1.episode > +n2.episode) {
          return 1;
      }
  
      if (+n1.episode < +n2.episode) {
          return -1;
      }
  
      return 0;
  });
    console.log("episode " + this.episodes);
  }

}

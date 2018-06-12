import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';
import{ ChromecastService } from '../chromecast.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;


  constructor(private route: ActivatedRoute,
    private kodiService: KodiService,
    private location: Location,
    private router: Router,
    private chromecastService: ChromecastService) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("get movie " + id)
    this.kodiService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  play(): void {
    this.chromecastService.launchMedia("http://192.168.1.47:8380/" + this.movie.strPath);//films/101_DALMATIENS/101_dalmatiens.mp4");
  }

  goBack(): void {
    this.kodiService.setInit("N");
    this.router.navigate(['/films']);
  }


}

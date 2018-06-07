import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../model/movie';
import { KodiService } from '../kodi.service';

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
    private router: Router) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("get movie " + id)
    this.kodiService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.kodiService.setInit("N");
    this.router.navigate(['/films']);
  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'
import { MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule, MatChipsModule, MatSelectModule, MatPaginatorModule, MatPaginatorIntl, MatSidenavModule, MatListModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatPaginatorIntlCusto } from './customization/matPaginatorCusto'
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';


//keycloak
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MessagesComponent,
    ShowDetailComponent,
    MovieDetailComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    KeycloakAngularModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['*', 'localhost:8080', 'api.pierrotplec.synology.me', 'api.pierrotplec.local'],
        blacklistedRoutes: ['image.tmdb.org']
      }
    })
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    multi: true,
    deps: [KeycloakService]
  },{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCusto}],
  bootstrap: [AppComponent]
})
export class AppModule { }

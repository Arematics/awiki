import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageComponent } from './components/page/page.component';
import { QueryComponent } from './components/query/query.component';
import {AppRouterModule} from './_router/router.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCaretDown, faCaretUp, faClock} from '@fortawesome/free-solid-svg-icons';
import { GroupComponent } from './components/menu/group/group.component';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatOptionModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EditorModule} from 'primeng/editor';
import {MatButtonModule} from '@angular/material/button';
import {CookieService} from 'ngx-cookie-service';
import {MatIconModule} from '@angular/material/icon';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AdsenseModule} from 'ng2-adsense';
import {BaseComponentModule} from './components/base.component.module';
import {AdminModule} from './admin/admin.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {PipeModule} from './_pipe/pipe.module';

function initializeKeycloak(keycloak: KeycloakService): any {
  return () =>
    keycloak.init({
      config: {
        url: environment.auth_api,
        realm: environment.realm_name,
        clientId: environment.client_id
      },
      /*initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },*/
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    PageComponent,
    QueryComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BaseComponentModule,
    AdminModule,
    FontAwesomeModule,
    MatDividerModule,
    HttpClientModule,
    MatOptionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    FormsModule,
    EditorModule,
    MatButtonModule,
    MatIconModule,
    KeycloakAngularModule,
    MatBottomSheetModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8838466162667140'
    }),
    PipeModule
  ],
  providers: [CookieService, {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(faCaretUp);
    library.addIcons(faCaretDown);
    library.addIcons(faClock);
  }
}

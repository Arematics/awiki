import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WikiEntryComponent } from './components/wiki-entry/wiki-entry.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageComponent } from './components/page/page.component';
import { QueryComponent } from './components/query/query.component';
import { HeadComponent } from './components/head/head.component';
import { FooterComponent } from './components/footer/footer.component';
import {AppRouterModule} from './_router/router.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SafePipe} from './_pipe/safe.pipe';
import { ImpressumComponent } from './components/impressum/impressum.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCaretDown, faCaretUp, faClock} from '@fortawesome/free-solid-svg-icons';
import { GroupComponent } from './components/menu/group/group.component';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EditorModule} from 'primeng/editor';
import {TooltipModule} from 'primeng/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CookieService} from 'ngx-cookie-service';
import { PanelComponent } from './admin/panel/panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EntrycreatorDialogComponent } from './admin/entrycreator-dialog/entrycreator-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { WikiEntryBoxComponent } from './components/wiki-entry/wiki-entry-box/wiki-entry-box.component';
import { EntrydeleteDialogComponent } from './admin/entrydelete-dialog/entrydelete-dialog.component';
import { GroupdeleteDialogComponent } from './admin/groupdelete-dialog/groupdelete-dialog.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService): any {
  return () =>
    keycloak.init({
      config: {
        url: environment.auth_api,
        realm: environment.realm_name,
        clientId: environment.client_id
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WikiEntryComponent,
    MenuComponent,
    PageComponent,
    QueryComponent,
    HeadComponent,
    FooterComponent,
    SafePipe,
    ImpressumComponent,
    GroupComponent,
    PanelComponent,
    EntrycreatorDialogComponent,
    WikiEntryBoxComponent,
    EntrydeleteDialogComponent,
    GroupdeleteDialogComponent
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
    FontAwesomeModule,
    MatDividerModule,
    HttpClientModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    FormsModule,
    EditorModule,
    TooltipModule,
    MatButtonModule,
    MatExpansionModule,
    DragDropModule,
    MatDialogModule,
    MatStepperModule,
    MatIconModule,
    MatBottomSheetModule,
    KeycloakAngularModule
  ],
  providers: [{
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

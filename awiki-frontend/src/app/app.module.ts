import { NgModule } from '@angular/core';
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
    EditorModule
  ],
  providers: [],
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

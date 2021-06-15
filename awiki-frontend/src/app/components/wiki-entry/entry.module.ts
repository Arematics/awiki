import { NgModule } from '@angular/core';
import {WikiEntryComponent} from './wiki-entry.component';
import {WikiEntryBoxComponent} from './wiki-entry-box/wiki-entry-box.component';
import {MatDividerModule} from '@angular/material/divider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/editor';



@NgModule({
  declarations: [WikiEntryComponent, WikiEntryBoxComponent],
  imports: [
    MatDividerModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    EditorModule
  ],
  exports: [WikiEntryComponent, WikiEntryBoxComponent]
})
export class WikiEntryModule {}

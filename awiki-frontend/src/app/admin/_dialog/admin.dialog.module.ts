import { NgModule } from '@angular/core';
import {EntrycreatorDialogComponent} from './entrycreator-dialog/entrycreator-dialog.component';
import {EntrydeleteDialogComponent} from './entrydelete-dialog/entrydelete-dialog.component';
import {GroupdeleteDialogComponent} from './groupdelete-dialog/groupdelete-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {EditorModule} from 'primeng/editor';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WikiEntryModule} from '../../components/wiki-entry/entry.module';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    EntrycreatorDialogComponent,
    EntrydeleteDialogComponent,
    GroupdeleteDialogComponent
  ],
    imports: [
        MatIconModule,
        MatStepperModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        EditorModule,
        MatSlideToggleModule,
        FormsModule,
        CommonModule,
        MatDividerModule,
        FontAwesomeModule,
        WikiEntryModule,
        MatChipsModule
    ],
  exports: [
    EntrycreatorDialogComponent,
    EntrydeleteDialogComponent,
    GroupdeleteDialogComponent
  ]
})
export class AdminDialogModule {}

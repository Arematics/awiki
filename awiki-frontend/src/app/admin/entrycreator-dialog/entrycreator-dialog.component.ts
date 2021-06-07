import {Component, Inject, OnInit} from '@angular/core';
import {MenuGroup} from '../../_model/menu.group';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EntryCreatorData} from '../entry.creator.data';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {WikiDataService} from '../../_service/wiki.data.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {FullEntry} from '../../_model/fullEntry';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {SmallEntry} from '../../_model/smallEntry';
import {EntryMetadata} from '../../_model/entryMetaData';

interface CustomForm{
  value: string;
  id: number;
}

@Component({
  selector: 'app-entrycreator-dialog',
  templateUrl: './entrycreator-dialog.component.html',
  styleUrls: ['./entrycreator-dialog.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EntrycreatorDialogComponent implements OnInit {
  group: MenuGroup;
  titleFormGroup: FormGroup;
  imageFormGroup: FormGroup;
  contentFormGroup: FormGroup;
  image = '';
  publish = false;

  exists = false;
  content = '';
  creatorId = '';
  changes = 0;
  titleControl = new FormControl('', [Validators.required]);
  imageControl = new FormControl('', Validators.required);
  contentControl = new FormControl('', Validators.required);

  metaData: EntryMetadata[] = [];
  result: FullEntry;

  constructor(public dialogRef: MatDialogRef<EntrycreatorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EntryCreatorData,
              private formBuilder: FormBuilder,
              private service: WikiDataService) {
  }

  async ngOnInit(): Promise<void> {
    this.group = this.data.group;
    this.titleFormGroup = this.formBuilder.group({titleControl: this.titleControl}, { updateOn: 'blur' });
    this.imageFormGroup = this.formBuilder.group({imageControl: this.imageControl});
    this.contentFormGroup = this.formBuilder.group({contentControl: this.contentControl});
    if ( this.data.entry !== undefined ){
      this.exists = true;
      this.titleControl.patchValue(this.data.entry.title);
      this.imageControl.patchValue('loaded');
      this.contentControl.patchValue(this.data.entry.content);
      this.content = this.data.entry.content;
      this.image = this.data.entry.image;
      this.publish = this.data.entry.published;
    } else {
      this.titleControl.setAsyncValidators(this.validateExists.bind(this));
    }
  }

  private validateExists(component: FormControl): Observable<{ exists: boolean } | ValidationErrors> {
    return this.service.getResource('entry/existsByTitleAndGroup?title=' + component.value + '&id=' + this.group.id)
      .pipe(map(isTaken => isTaken ? of('validateExists') : isTaken), catchError(() => of('validateExists')));
  }

  selectFile(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    this.imageControl.patchValue(file.name);
  }

  handleReaderLoaded(readerEvt): any {
    this.image = readerEvt.target.result;
    this.image = 'data:image/png;base64,' + btoa(this.image);
  }

  isInvalidFormExists(): boolean{
    return this.titleFormGroup.invalid || this.imageFormGroup.invalid || this.contentFormGroup.invalid;
  }

  validateData(): FullEntry{
    const id = this.exists ? this.data.entry.id : undefined;
    return {
     id,
     title: this.titleControl.value,
     orderIndex: 1,
     lastChange: new Date(),
     menuGroup: this.group.id,
     image: this.image,
     content: this.contentControl.value, published: this.publish,
     calls: 0
    };
  }

  async saveEntry(): Promise<void> {
    if (this.isInvalidFormExists()){
      return;
    }
    const entry = this.validateData();
    if ( !this.exists ){
      const data: SmallEntry[] = await this.service.getResource('entry/childrenOfGroup/' + this.group.id)
        .toPromise()
        .then();
      entry.orderIndex = Math.max(...data.map(o => o.orderIndex), 0) + 1;
    }
    const result = await this.service.postResource('entry', entry).toPromise();
    if ( !this.exists ){
      const creator = {id: null, entryId: result.id, name: 'creator', value: this.data.userProfile.id};
      const createdAt =  {id: null, entryId: result.id, name: 'createdAt', value: new Date()};
      this.service.postResource('metadata', creator).toPromise().then();
      this.service.postResource('metadata', createdAt).toPromise().then();
    }
    const newChanges = {id: null, entryId: result.id, name: 'changes', value: 0};
    const changes = await this.service.getResource(`metadata/search/findByEntryIdAndName?entryId=${result.id}&name=changes`)
      .toPromise()
      .then(data => data, err => newChanges);
    changes.value++;
    this.service.postResource('metadata', changes).toPromise().then();
    const newEditor = {id: null, entryId: result.id, name: 'lastEditor', value: this.data.userProfile.id};
    const lastEditor = await this.service.getResource(`metadata/search/findByEntryIdAndName?entryId=${result.id}&name=lastEditor`)
      .toPromise()
      .then(data => data, err => newEditor);
    lastEditor.value = this.data.userProfile.id;
    this.service.postResource('metadata', lastEditor).toPromise().then();
  }
}

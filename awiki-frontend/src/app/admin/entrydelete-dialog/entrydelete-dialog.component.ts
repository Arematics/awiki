import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EntryCreatorData} from '../entry.creator.data';
import {EntryDeleteData} from '../entry.delete.data';

@Component({
  selector: 'app-entrydelete-dialog',
  templateUrl: './entrydelete-dialog.component.html',
  styleUrls: ['./entrydelete-dialog.component.scss']
})
export class EntrydeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EntrydeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EntryDeleteData) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  onYesClick(): void{
    this.dialogRef.close(true);
  }
}

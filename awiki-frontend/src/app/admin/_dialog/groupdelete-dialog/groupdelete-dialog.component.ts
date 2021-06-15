import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupDeleteData} from '../../_model/group.delete.data';

@Component({
  selector: 'app-groupdelete-dialog',
  templateUrl: './groupdelete-dialog.component.html',
  styleUrls: ['./groupdelete-dialog.component.scss']
})
export class GroupdeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GroupdeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupDeleteData) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  onYesClick(): void{
    this.dialogRef.close(true);
  }

}

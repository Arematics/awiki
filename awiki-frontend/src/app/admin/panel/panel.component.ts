import { Component, OnInit } from '@angular/core';
import {MenuGroup} from '../../_model/menu.group';
import {WikiDataService} from '../../_service/wiki.data.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SmallEntry} from '../../_model/smallEntry';
import {FullEntry} from '../../_model/fullEntry';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {EntrycreatorDialogComponent} from '../entrycreator-dialog/entrycreator-dialog.component';
import {GroupdeleteDialogComponent} from '../groupdelete-dialog/groupdelete-dialog.component';
import {EntrydeleteDialogComponent} from '../entrydelete-dialog/entrydelete-dialog.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  fetchedGroups: MenuGroup[];
  fetchedEntries: SmallEntry[] = [];
  fetchedFullEntry: FullEntry;
  entryOrderChange = false;
  createGroupMode = false;

  constructor(private service: WikiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void{
    this.service.getResource('group?size=500').subscribe(result => {
      this.fetchedGroups = result._embedded.group;
      this.fetchedGroups.sort((a, b) => a.orderIndex - b.orderIndex);
    });
  }

  fetchEntries(groupId: number): void{
    this.service.getResource('entries/search/findAllByGroup_Id?id=' + groupId)
      .pipe(map(data => data._embedded.entries))
      .subscribe(data => {
        this.fetchedEntries = data;
        this.fetchedEntries.sort((a, b) => a.orderIndex - b.orderIndex);
      });
  }

  fetchData(entryId: number): void{
    this.service.getResource('fullentry/' + entryId).subscribe(data => this.fetchedFullEntry = data);
  }

  drop(event: CdkDragDrop<MenuGroup, any>): void {
    moveItemInArray(this.fetchedGroups, event.previousIndex, event.currentIndex);
    this.fetchedGroups.forEach((item, index) => item.orderIndex = index);
    this.fetchedGroups.forEach(group => this.service.postResource('group', group).toPromise().then());
  }

  dropEntry(event: CdkDragDrop<SmallEntry, any>): void {
    moveItemInArray(this.fetchedEntries, event.previousIndex, event.currentIndex);
    this.fetchedEntries.forEach((item, index) => item.orderIndex = index);
    this.fetchedEntries.forEach(entry => {
      this.service.getResource('fullentry/' + entry.id).subscribe(result => {
        result.orderIndex = entry.orderIndex;
        this.service.postResource('fullentry', result).toPromise().then();
      });
    });
  }

  createNewGroup(): void {
    this.createGroupMode = true;
  }

  createNewEntry(group: MenuGroup, entry: FullEntry): void{
    const dialogRef = this.dialog.open(EntrycreatorDialogComponent, {data: {group, entry}});
    dialogRef.afterClosed().subscribe(() => this.fetchEntries(group.id));
  }

  editEntry(group: MenuGroup, entry: SmallEntry): void{
    this.service.getResource('fullentry/' + entry.id).subscribe(data => this.createNewEntry(group, data));
  }

  openDeleteGroupDialog(group: MenuGroup): void{
    const dialogRef = this.dialog.open(GroupdeleteDialogComponent, {
      data: {group}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.fetchedEntries.length);
      if ( result && this.fetchedEntries.length <= 0){
        this.deleteGroup(group);
      }
    });
  }

  openDeleteEntryDialog(entry: SmallEntry): void{
    const dialogRef = this.dialog.open(EntrydeleteDialogComponent, {
      data: {entry}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.deleteEntry(entry);
      }
    });
  }

  deleteGroup(group: MenuGroup): void{
    this.service.deleteResource('group/' + group.id)
      .toPromise()
      .then(() => {
        this.fetchedGroups.splice(this.fetchedGroups.indexOf(group), 1);
        this.fetchedGroups.forEach((item, index) => item.orderIndex = index);
      });
  }

  deleteEntry(entry: SmallEntry): void{
    this.service.deleteResource('entries/' + entry.id)
      .toPromise()
      .then(() => {
        this.fetchedEntries.splice(this.fetchedEntries.indexOf(entry), 1);
        this.fetchedEntries.forEach((item, index) => item.orderIndex = index);
      });
  }

  sendCreate() {

  }
}

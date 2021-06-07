import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {Menu} from 'primeng/menu';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  fetchedGroups: MenuGroup[];
  entryOrderChange = false;
  createGroupMode = false;

  constructor(private service: WikiDataService,
              public dialog: MatDialog,
              private changeDetection: ChangeDetectorRef,
              private readonly keycloak: KeycloakService) { }

  public async ngOnInit(): Promise<any> {
    this.fetchGroups();
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userProfile.id = this.keycloak.getKeycloakInstance().subject;
    }
  }

  public logout(): void {
    this.keycloak.logout();
  }

  fetchGroups(): void{
    this.service.getResource('group?size=500').subscribe(result => {
      this.fetchedGroups = result._embedded.group;
      this.fetchedGroups.sort((a, b) => a.orderIndex - b.orderIndex);
    });
  }

  fetchEntries(group: MenuGroup): void{
    this.service.getResource('entry/childrenOfGroup/' + group.id)
      .subscribe(data => {
        this.changeDetection.detectChanges();
        group.entries = data;
        group.entries.sort((a, b) => a.orderIndex - b.orderIndex);
        this.changeDetection.detectChanges();
      });
  }

  drop(event: CdkDragDrop<MenuGroup, any>): void {
    moveItemInArray(this.fetchedGroups, event.previousIndex, event.currentIndex);
    this.fetchedGroups.forEach((item, index) => item.orderIndex = index);
    this.fetchedGroups.forEach(group => {
      this.service.postResourceNoBody('grouping/update/index?id=' + group.id + '&orderIndex=' + group.orderIndex).toPromise().then();
    });
  }

  dropEntry(group: MenuGroup, event: CdkDragDrop<SmallEntry, any>): void {
    moveItemInArray(group.entries, event.previousIndex, event.currentIndex);
    group.entries.forEach((item, index) => item.orderIndex = index);
    group.entries.forEach(entry => {
      this.service.postResourceNoBody('entry/update/index?id=' + entry.id + '&orderIndex=' + entry.orderIndex).toPromise().then();
    });
  }

  createNewGroup(): void {
    this.createGroupMode = true;
    setTimeout(() => window.document.getElementById('groupName').focus(), 100);
  }

  createNewEntry(group: MenuGroup, entry: FullEntry): void{
    const dialogRef = this.dialog.open(EntrycreatorDialogComponent, {
      data: {group, entry, userProfile: this.userProfile},
      maxWidth: '100vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ){
        this.fetchEntries(group);
      }
    });
  }

  editEntry(group: MenuGroup, entry: SmallEntry): void{
    this.service.getResource('entry/' + entry.id).subscribe(data => this.createNewEntry(group, data));
  }

  openDeleteGroupDialog(group: MenuGroup): void{
    const dialogRef = this.dialog.open(GroupdeleteDialogComponent, {
      data: {group},
      maxWidth: '100vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result && !this.hasEntries(group)){
        this.deleteGroup(group);
      }
    });
  }

  openDeleteEntryDialog(group: MenuGroup, entry: SmallEntry): void{
    const dialogRef = this.dialog.open(EntrydeleteDialogComponent, {
      data: {entry},
      maxWidth: '101vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.deleteEntry(group, entry);
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

  deleteEntry(group: MenuGroup, entry: SmallEntry): void{
    this.service.deleteResource('entry/' + entry.id)
      .toPromise()
      .then(() => {
        group.entries.splice(group.entries.indexOf(entry), 1);
        group.entries.forEach((item, index) => item.orderIndex = index);
      });
  }

  onEnterCreate(event: KeyboardEvent): void {
    if ( event.key === 'Enter' ){
      const input: HTMLInputElement = event.target as HTMLInputElement;
      const value = input.value;
      if ( this.fetchedGroups.filter(group => group.title === value).length <= 0){
        const group = {id: null, title: value, orderIndex: this.fetchedGroups.length, entries: []};
        this.service.postResource('group', group).toPromise().then(result => {
          this.fetchedGroups.push(result);
        });
      }
      this.createGroupMode = false;
    }
  }

  interruptCreate(): void {
    this.createGroupMode = false;
  }

  hasEntries(group: MenuGroup): boolean {
    return group.entries !== undefined && group.entries.length > 0;
  }
}

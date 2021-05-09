import { Component, OnInit } from '@angular/core';
import {MenuGroup} from '../../_model/menu.group';
import {WikiEntry} from '../../_model/wiki.entry';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  groups: MenuGroup[];

  constructor() { }

  ngOnInit(): void {
    const entries: WikiEntry[] = [{groupId: 1, id: 1, orderIndex: 0, title: 'TestEntry 1'},
      {groupId: 1, id: 2, orderIndex: 1, title: 'TestEntry 2'}];
    this.groups = [{id: 1, title: '', orderIndex: 0, entries},
      {id: 2, title: 'Test 1', orderIndex: 0, entries},
      {id: 3, title: 'Test 2', orderIndex: 0, entries},
      {id: 4, title: 'Test 3', orderIndex: 0, entries},
      {id: 5, title: 'Test 4', orderIndex: 0, entries},
      {id: 6, title: 'Test 5', orderIndex: 0, entries},
      {id: 7, title: 'Test 6', orderIndex: 0, entries},
      {id: 8, title: 'Test 7', orderIndex: 0, entries}];
  }

}

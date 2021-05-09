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
    const entries: WikiEntry[] = [{groupId: 1, id: 1, orderIndex: 0, title: 'Kekw'}, {groupId: 1, id: 2, orderIndex: 1, title: 'Kek2'}];
    this.groups = [{id: 1, title: '', orderIndex: 0, entries},
      {id: 2, title: 'Vallah du hübsche', orderIndex: 0, entries},
      {id: 3, title: 'asf du hübsche', orderIndex: 0, entries},
      {id: 4, title: 'fhdfh', orderIndex: 0, entries},
      {id: 5, title: 'ASF', orderIndex: 0, entries},
      {id: 6, title: 'vxcFG', orderIndex: 0, entries},
      {id: 7, title: 'WRSDG', orderIndex: 0, entries},
      {id: 8, title: 's', orderIndex: 0, entries}];
  }

}

import { Component, OnInit } from '@angular/core';
import {MenuGroup} from '../../_model/menu.group';
import {WikiEntry} from '../../_model/wiki.entry';
import {WikiDataService} from '../../_service/wiki.data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  groups: MenuGroup[];

  constructor(private wikiData: WikiDataService) { }

  ngOnInit(): void {
    this.wikiData.map.set(1, {groupId: 1, id: 1, orderIndex: 0, title: 'TestEntry 1'});
    this.wikiData.map.set(2, {groupId: 1, id: 2, orderIndex: 0, title: 'TestEntry 2'});
    this.wikiData.map.set(3, {groupId: 1, id: 3, orderIndex: 0, title: 'TestEntry 3'});
    this.wikiData.map.set(4, {groupId: 1, id: 4, orderIndex: 0, title: 'TestEntry 4'});
    this.wikiData.map.set(5, {groupId: 1, id: 5, orderIndex: 0, title: 'TestEntry 5'});
    this.wikiData.map.set(6, {groupId: 1, id: 6, orderIndex: 0, title: 'TestEntry 6'});
    this.groups = [{id: 1, title: '', orderIndex: 0, entries: [this.wikiData.map.get(1)]},
      {id: 2, title: 'Test 1', orderIndex: 0, entries: [this.wikiData.map.get(2)]},
      {id: 3, title: 'Test 2', orderIndex: 0, entries: [this.wikiData.map.get(3)]},
      {id: 4, title: 'Test 3', orderIndex: 0, entries: [this.wikiData.map.get(4)]},
      {id: 5, title: 'Test 4', orderIndex: 0, entries: [this.wikiData.map.get(5)]},
      {id: 6, title: 'Test 5', orderIndex: 0, entries: [this.wikiData.map.get(6)]}];
  }

}

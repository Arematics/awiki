import { Component, OnInit } from '@angular/core';
import {MenuGroup} from '../../_model/menu.group';
import {WikiDataService} from '../../_service/wiki.data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  groups: MenuGroup[] = [];

  constructor(private wikiData: WikiDataService) { }

  ngOnInit(): void {
    this.wikiData.getResource('group').subscribe(groups => {
      const data: MenuGroup[] = groups._embedded.group;
      // tslint:disable-next-line:no-shadowed-variable
      data.forEach(group => {
        this.wikiData.getResource('entry/publishedChildrenOfGroup/' + group.id).subscribe(entries => {
          group.entries = entries;
          group.entries.sort((a, b) => a.orderIndex - b.orderIndex);
          this.groups.push(group);
          this.groups.sort((a, b) => a.orderIndex - b.orderIndex);
        });
      });
    });
  }

}

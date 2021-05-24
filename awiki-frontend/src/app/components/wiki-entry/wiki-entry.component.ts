import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WikiDataService} from '../../_service/wiki.data.service';
import {FullEntry} from '../../_model/fullEntry';
import {MenuGroup} from '../../_model/menu.group';

@Component({
  selector: 'app-wiki-entry[entry][group]',
  templateUrl: './wiki-entry.component.html',
  styleUrls: ['./wiki-entry.component.scss']
})
export class WikiEntryComponent implements OnInit {
  entry: FullEntry;
  group: MenuGroup;

  constructor(private wikiService: WikiDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.entry = data.entry;
      this.group = data.group;
    });
  }

}

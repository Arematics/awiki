import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WikiDataService} from '../../_service/wiki.data.service';
import {FullEntry} from '../../_model/fullEntry';
import {MenuGroup} from '../../_model/menu.group';
import {Title} from '@angular/platform-browser';
import {SeoService} from '../../_service/seo.service';

@Component({
  selector: 'app-wiki-entry[entry][group]',
  templateUrl: './wiki-entry.component.html',
  styleUrls: ['./wiki-entry.component.scss']
})
export class WikiEntryComponent implements OnInit {
  entry: FullEntry;
  group: MenuGroup;

  constructor(private wikiService: WikiDataService, private activatedRoute: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.entry = data.entry;
      this.group = data.group;
      this.seo.updateTitle(this.entry.title + ' - ' + ' Arematics Wiki');
    });
  }

}

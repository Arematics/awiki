import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WikiDataService} from '../../_service/wiki.data.service';
import {FullEntry} from '../../_model/fullEntry';
import {MenuGroup} from '../../_model/menu.group';
import {SeoService} from '../../_service/seo.service';
import {EntryMetadata} from '../../_model/entryMetaData';

@Component({
  selector: 'app-wiki-entry[entry][group]',
  templateUrl: './wiki-entry.component.html',
  styleUrls: ['./wiki-entry.component.scss']
})
export class WikiEntryComponent implements OnInit {
  entry: FullEntry;
  group: MenuGroup;

  constructor(private service: WikiDataService, private activatedRoute: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.entry = data.entry;
      this.group = data.group;
      this.seo.updateTitle(this.entry.title + ' - ' + ' Arematics Wiki');
      this.loadMeta(this.entry).then();
    });
  }

  async loadMeta(entry: FullEntry): Promise<void>{
    const keywords: EntryMetadata =
      await this.service.getResource(`metadata/search/findByEntryIdAndName?entryId=${entry.id}&name=keywords`)
        .toPromise()
        .then(data => data, err => {});
    if (keywords.value !== undefined){
      this.seo.addKeywords(keywords.value.split(', '));
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WikiDataService} from '../../_service/wiki.data.service';
import {WikiEntry} from '../../_model/wiki.entry';

@Component({
  selector: 'app-wiki-entry',
  templateUrl: './wiki-entry.component.html',
  styleUrls: ['./wiki-entry.component.scss']
})
export class WikiEntryComponent implements OnInit {
  entry: WikiEntry;

  constructor(private route: ActivatedRoute, private wikiData: WikiDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== undefined && id !== null){
        this.entry = this.wikiData.map.get(Number(id));
      }
    });
  }

}

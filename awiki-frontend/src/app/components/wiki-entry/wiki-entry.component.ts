import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WikiDataService} from '../../_service/wiki.data.service';
import {MenuGroup} from '../../_model/menu.group';
import {FullEntry} from '../../_model/fullEntry';

@Component({
  selector: 'app-wiki-entry',
  templateUrl: './wiki-entry.component.html',
  styleUrls: ['./wiki-entry.component.scss']
})
export class WikiEntryComponent implements OnInit {
  group: MenuGroup;
  entry: FullEntry;

  constructor(private route: ActivatedRoute, private wikiService: WikiDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== undefined && id !== null){
        this.group = undefined;
        this.entry = undefined;
        this.wikiService.getResource('fullentry/' + id).subscribe(entry => {
          this.entry = entry;
          this.wikiService.getResource('entries/' + id + '/menuGroup').subscribe(group => {
            this.group = group;
          });
        });
      }
    });
  }

}

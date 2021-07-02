import { Component, OnInit } from '@angular/core';
import {FullEntry} from '../../_model/fullEntry';
import {WikiDataService} from '../../_service/wiki.data.service';
import {map} from 'rxjs/operators';
import {SeoService} from '../../_service/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filteredResults: FullEntry[] = [];

  constructor(private wikiService: WikiDataService, private seo: SeoService) { }

  ngOnInit(): void {
    this.filterCountry().then();
    this.seo.updateTitle('Landing Page - Arematics Wiki');
  }

  async filterCountry(): Promise<any> {
    this.filteredResults = await this.fetchResults();
  }

  fetchResults(): Promise<FullEntry[]>{
    return this.wikiService.getResource('entry')
      .pipe(map(result => result))
      .toPromise();
  }

}

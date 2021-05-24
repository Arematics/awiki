import {Component, OnInit} from '@angular/core';
import {WikiDataService} from '../../_service/wiki.data.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

class ResultItem{
  label: string;
  text: string;
  entryId: number;

  constructor(label: string, text: string, entryId: number) {
    this.label = label;
    this.text = text;
    this.entryId = entryId;
  }
}

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  filteredResults: any[];

  constructor(private router: Router, private wikiService: WikiDataService) { }

  ngOnInit(): void {
  }

  async filterCountry(event): Promise<any> {
    const filtered: ResultItem[] = [];
    const query = event.query;

    if (query.indexOf('title: ') === 0){
      const results = await this.fetchResultItemsByTitle(query);
      filtered.push(...results);
    }else if (query.indexOf('text: ') === 0){
      const results = await this.fetchResultItemsByContent(query);
      filtered.push(...results);
    }else{
      const results = await this.fetchResultItemsByTitle(query);
      filtered.push(...results);
      const results2 = await this.fetchResultItemsByContent(query);
      filtered.push(...results2);
    }

    this.filteredResults = filtered;
    event.query = '';
  }

  fetchResultItemsByTitle(input): Promise<ResultItem[]>{
    input = input.indexOf('title: ') === 0 ? input.substr(input.indexOf(' ') + 1) : input;
    return this.wikiService.getResource('fullentry/search/findAllByTitleContains?title=' + input)
      .pipe(map(result => result._embedded.fullentry.map(entry =>
        new ResultItem(entry.title.toUpperCase().replace(input.toUpperCase(),
          '<b style="color: var(--color-blue-accent)">' + input + '</b>'),
          entry.content.substr(0, 200) + ' ...', entry.id))))
      .toPromise();
  }

  fetchResultItemsByContent(input): Promise<ResultItem[]>{
    input = input.indexOf('text: ') === 0 ? input.substr(input.indexOf(' ') + 1) : input;
    return this.wikiService.getResource('fullentry/search/findAllByContentContains?like=' + input)
      .pipe(map(result => result._embedded.fullentry.map(entry => {
        const content = entry.content;
        const first = content.indexOf(input);
        const end = content.indexOf(' ', first + input.length);
        const wordLength = (end - first) + 1;
        const begin2 = first - 50 < 0 ? 0 : first - 50;
        const trimPlace = content.substr(begin2, 50 + wordLength + 60);
        const replaced = trimPlace.replace(input, '<b style="color: red">' + input + '</b>');
        return new ResultItem(entry.title + ' (Text Match)', (begin2 !== 0 ? '... ' : '') + replaced + ' ...', entry.id);
      })))
      .toPromise();
  }

  select(event: any): void {
    this.router.navigate(['entry', event.entryId]).then();
  }
}

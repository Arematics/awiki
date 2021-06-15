import {Component, OnInit} from '@angular/core';
import {WikiDataService} from '../../_service/wiki.data.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

class ResultItem{
  label: string;
  text: string;
  object: any;

  constructor(label: string, text: string, object: any) {
    this.label = label;
    this.text = text;
    this.object = object;
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
    const data = [];
    const query = event.query;

    if (query.indexOf('title: ') === 0){
      const trimQuery = query.substr(query.indexOf(' ') + 1);
      const results = await this.fetchResultItemsByTitle(trimQuery);
      data.push(...results);
    }else if (query.indexOf('text: ') === 0){
      const trimQuery = query.substr(query.indexOf(' ') + 1);
      const results = await this.fetchResultItemsByContent(trimQuery);
      data.push(...results);
    }else{
      const results = await this.fetchResultItemsByTitle(query);
      data.push(...results);
      const results2 = await this.fetchResultItemsByContent(query);
      data.push(...results2);
    }

    this.filteredResults = data;
    event.query = '';
  }

  fetchResultItemsByTitle(input): Promise<ResultItem[]>{
    return this.wikiService.getResource('entry/findAllByTitle?title=' + input)
      .pipe(map(result => result.map(entry =>
        new ResultItem(entry.title.toUpperCase().replace(input.toUpperCase(),
          '<b style="color: var(--color-blue-accent)">' + input + '</b>'),
          entry.content.substr(0, 200) + ' ...', entry))))
      .toPromise();
  }

  fetchResultItemsByContent(input): Promise<ResultItem[]>{
    return this.wikiService.getResource('entry/findAllByContent?like=' + input)
      .pipe(map(result => result.map(entry => {
        return new ResultItem(entry.title + ' (Text Match)', this.highlightMatches(entry.content, input), entry);
      })))
      .toPromise();
  }

  highlightMatches(content: string, input: string): string{
    const firstMatch = content.toLowerCase().indexOf(input.toLowerCase());
    const end = content.indexOf(' ', firstMatch + input.length);
    const wordLength = (end - firstMatch) + 1;
    const begin2 = firstMatch - 50 < 0 ? 0 : firstMatch - 50;
    const trimPlace = content.substr(begin2, 50 + wordLength + 60);
    const addedDots = (begin2 !== 0 ? '... ' : '') + trimPlace + '...';
    return addedDots.replace(input, '<b style="color: red">' + input + '</b>');
  }

  select(event: any): void {
    this.router.navigate(['entry', event.object.id]).then();
  }
}

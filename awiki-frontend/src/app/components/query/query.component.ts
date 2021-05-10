import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  countries: any[];
  filteredCountries: any[];

  constructor() { }

  ngOnInit(): void {
    this.countries = [{label: 'Berlin', name: 'Berlin'}, {label: 'Munich', name: 'Munich'}, {label: 'Düsseldorf', name: 'Düsseldorf'}];
  }

  filterCountry(event): any {
    const filtered: any[] = [];
    const query = event.query;

    for (const country of this.countries) {
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}

import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {FullEntry} from '../_model/fullEntry';
import {Injectable} from '@angular/core';
import {WikiDataService} from '../_service/wiki.data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WikiEntryGroupResolver implements Resolve<FullEntry> {
  constructor(private dataService: WikiDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FullEntry> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.dataService.getResource('entries/' + id + '/group');
  }
}

import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {FullEntry} from '../_model/fullEntry';
import {Injectable} from '@angular/core';
import {WikiDataService} from '../_service/wiki.data.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WikiEntryResolver implements Resolve<FullEntry> {
  constructor(private dataService: WikiDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FullEntry> | Observable<never> {
    const id = route.paramMap.get('id');
    const tmpUUID = route.queryParamMap.get('tmpUUID');
    return this.dataService.getResource('entry/' + id + (tmpUUID !== null ? `?tmpUUID=${tmpUUID}` : ''))
      .pipe(
        map(product => product),
        catchError(error => this.router.navigate(['/error']))
      );
  }
}

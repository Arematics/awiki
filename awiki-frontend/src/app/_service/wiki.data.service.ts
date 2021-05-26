import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {hasErrors} from '@angular/compiler-cli/ngcc/src/packages/transformer';

@Injectable({
  providedIn: 'root'
})
export class WikiDataService{

  constructor(private http: HttpClient, private cookies: CookieService) {}

  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Basic ' + this.cookies.get('access_token')
    });
    return this.http.get(environment.rest_url + resourceUrl, { headers });
  }

  postResourceNoBody(url): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Basic ' + this.cookies.get('access_token')
    });
    return this.http.post(environment.rest_url + url, { headers });
  }

  postResource(url, resource): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Basic ' + this.cookies.get('access_token')
    });
    return this.http.post(environment.rest_url + url, resource, { headers });
  }

  putResource(url, resource): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Basic ' + this.cookies.get('access_token')
    });
    return this.http.put(environment.rest_url + url, resource, { headers });
  }

  deleteResource(url): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Basic ' + this.cookies.get('access_token')
    });

    return this.http.delete(environment.rest_url + url, {headers});
  }
}

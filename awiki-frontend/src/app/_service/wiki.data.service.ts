import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {WikiEntry} from '../_model/wiki.entry';

// @ts-ignore
const headers = new HttpHeaders({
  'Content-type': 'application/json',
  Authorization: 'Basic YWRtaW46c2FBJWlzYTVBYjBIL1Yz'
});

@Injectable({
  providedIn: 'root'
})
export class WikiDataService{

  map = new Map<number, WikiEntry>();

  constructor(private http: HttpClient) { }

  getResource(resourceUrl): Observable<any> {
    return this.http.get(environment.rest_url + resourceUrl, { headers });
  }

  postResource(url, resource): Observable<any>{
    return this.http.post(environment.rest_url + url, resource, { headers });
  }

  putResource(url, resource): Observable<any>{
    return this.http.put(environment.rest_url + url, resource, { headers });
  }

  deleteResource(url): Observable<any>{
    return this.http.delete(environment.rest_url + url, { headers });
  }
}

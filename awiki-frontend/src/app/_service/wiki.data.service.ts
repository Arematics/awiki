import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WikiDataService{

  constructor(private http: HttpClient) {}

  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.get(environment.rest_url + resourceUrl, { headers });
  }

  postResourceNoBody(url): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post(environment.rest_url + url, {withCredentials: true,  headers });
  }

  postResource(url, resource): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post(environment.rest_url + url, resource, {withCredentials: true,  headers });
  }

  putResource(url, resource): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.put(environment.rest_url + url, resource, {withCredentials: true,  headers });
  }

  deleteResource(url): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http.delete(environment.rest_url + url, {withCredentials: true, headers});
  }
}

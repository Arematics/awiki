import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthorizationService{
  public clientId = 'webpanel';

  public userName = 'None';

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

  retrieveToken(code): void {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', '638d0a30-a139-441c-b0bf-9d719e711e9c');
    params.append('redirect_uri', environment.redirect_to);
    params.append('code', code);

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    this.http.post(environment.auth_api + 'auth/realms/arematics/protocol/openid-connect/token',
      params.toString(), { headers })
      .subscribe(
        data => this.saveToken(data),
        err => {
          this.cookies.delete('access_token');
          this.router.navigate(['/login'], { queryParams: { returnUrl: '' }});
        });
  }

  saveToken(token): void {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookies.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = environment.redirect_to;
  }

  checkValid(): void{
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + this.cookies.get('access_token')});
    this.http.get(environment.auth_api + 'auth/realms/arematics/protocol/openid-connect/userinfo', { headers })
      .subscribe(
        data => this.userName = data[`preferred_username`],
        err => {
          this.cookies.delete('access_token');
          this.router.navigate(['/login'], { queryParams: { returnUrl: '' }});
        });
  }

  checkCredentials(): boolean {
    return this.cookies.check('access_token');
  }

  logout(): void {
    this.cookies.delete('access_token');
    console.log(this.cookies.get('access_token'));
    window.location.reload();
  }
}

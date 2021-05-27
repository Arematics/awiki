import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthorizationService} from '../../_service/authorization.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginIsDone = false;

  constructor(private router: ActivatedRoute, private service: AuthorizationService) { }

  ngOnInit(): void {
    const loggedIn = this.service.checkCredentials();
    const i = window.location.href.indexOf('code');
    if ( !loggedIn && i !== -1) {
      const first = decodeURIComponent(window.location.href);
      const second = decodeURIComponent(first);
      const val = second.split('code=')[1].split('&')[0];
      this.service.retrieveToken(val);
    }
  }

  login(): void {
    window.location.href = environment.auth_api + 'auth/realms/' + environment.realm_name +
      '/protocol/openid-connect/auth?response_type=code' +
      '&client_id=' + this.service.clientId +
      '&scope=openid&roles' +
      '&redirect_uri=' + environment.redirect_to;
  }

  logout(): void {
    this.service.logout();
  }

  isValid(): boolean{
    const login = this.service.checkCredentials();
    if (login) {
      this.service.checkValid();
      return this.service.checkCredentials();
    }
    return false;
  }

}

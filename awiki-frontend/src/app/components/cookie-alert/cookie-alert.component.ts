import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-alert',
  templateUrl: './cookie-alert.component.html',
  styleUrls: ['./cookie-alert.component.scss']
})
export class CookieAlertComponent implements OnInit {

  manageCookies = false;
  currentDate = new Date();

  constructor(private cookies: CookieService) {}

  ngOnInit(): void {
  }

  allowCookies(): void{
    this.cookies.set('cookie-accepted', 'true',
      new Date(this.currentDate.getFullYear() + 2, this.currentDate.getMonth(), this.currentDate.getDay()));
  }
}

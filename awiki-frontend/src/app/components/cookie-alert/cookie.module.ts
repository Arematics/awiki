import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CookieAlertComponent} from './cookie-alert.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [CookieAlertComponent],
  exports: [CookieAlertComponent],
  providers: [CookieService],
  imports: [
    RouterModule,
    MatButtonModule
  ]
})
export class CookieModule {}

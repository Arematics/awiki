import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {from} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'wiki';

  constructor(private cookies: CookieService, private route: ActivatedRoute) {
  }

  onActivate(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === undefined || fragment === null){
        const scrollToTop = window.setInterval(() => {
          const pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 30); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 20);
      }
    });
  }

  areCookiesNotAccepted(): boolean{
    return  this.cookies.get('cookie-accepted') !== 'true';
  }
}

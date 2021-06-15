import {Component, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageComponent} from './components/page/page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'wiki';
  @ViewChild(PageComponent) page: PageComponent;

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
    this.page.onActivate();
  }

  areCookiesNotAccepted(): boolean{
    return  this.cookies.get('cookie-accepted') !== 'true';
  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  isVisible = true;
  adsVisible: any = true;
  queryVisible: any = true;

  forceNotVisible = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.forceNotVisible = this.isVisible === false;
    if ( !this.forceNotVisible){
      this.isVisible = window.innerWidth >= 800;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void{
    if ( !this.forceNotVisible){
      this.isVisible = window.innerWidth >= 750;
    }
  }

  onActivate(): void {
    this.isVisible = this.isSideBarVisible();
    this.adsVisible = this.isAdsVisible();
    this.queryVisible = this.isQueryVisible();
    this.forceNotVisible = this.isVisible === false;
  }

  isSideBarVisible(): boolean{
    return this.notDisabledRoutes();
  }

  isAdsVisible(): boolean{
    return this.notDisabledRoutes();
  }

  private isQueryVisible(): boolean {
    return this.notDisabledRoutes();
  }

  notDisabledRoutes(): boolean{
    switch (this.router.url) {
      case '/admin': return false;
      case '/privacy': return false;
      case '/impressum': return false;
    }
    return true;
  }
}

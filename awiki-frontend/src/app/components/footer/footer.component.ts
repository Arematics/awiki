import { Component, OnInit } from '@angular/core';
import {NavigationItem} from '../../_model/navigation.item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navItems: NavigationItem[];
  currentYear = new Date().getFullYear();

  constructor(private sanitizer: DomSanitizer) {
    this.navItems = environment.footerNavigation;
  }

  ngOnInit(): void {
  }

  byPassUrl(url: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}

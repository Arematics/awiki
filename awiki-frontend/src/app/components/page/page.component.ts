import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  isVisible: any;

  constructor() { }

  ngOnInit(): void {
    this.isVisible = window.innerWidth >= 800;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void{
    this.isVisible = window.innerWidth >= 750;
  }
}

import { Component} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MenuComponent} from '../menu/menu.component';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent{

  constructor(private bottomSheet: MatBottomSheet) { }

  openMenu(): void {
    this.bottomSheet.open(MenuComponent);
  }
}

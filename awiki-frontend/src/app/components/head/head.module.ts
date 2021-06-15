import { NgModule } from '@angular/core';
import {HeadComponent} from './head.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [HeadComponent],
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [HeadComponent]
})
export class HeadModule {}

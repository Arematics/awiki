import { NgModule } from '@angular/core';
import {FooterComponent} from './footer.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PipeModule} from '../../_pipe/pipe.module';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipeModule
  ],
  exports: [FooterComponent]
})
export class FooterModule {}

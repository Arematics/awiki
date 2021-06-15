import { NgModule } from '@angular/core';
import {PanelComponent} from './panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [PanelComponent],
  imports: [
    MatExpansionModule,
    MatButtonModule,
    DragDropModule,
    CommonModule,
    MatInputModule
  ],
  exports: [PanelComponent]
})
export class PanelModule {}

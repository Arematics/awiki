import { NgModule } from '@angular/core';
import {PanelModule} from './panel/panel.module';
import {AdminDialogModule} from './_dialog/admin.dialog.module';



@NgModule({
  exports: [
    PanelModule,
    AdminDialogModule
  ]
})
export class AdminModule {}

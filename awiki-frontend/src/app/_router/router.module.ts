import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {WikiEntryComponent} from '../components/wiki-entry/wiki-entry.component';
import {ImpressumComponent} from '../components/impressum/impressum.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'entry/:id', component: WikiEntryComponent},
  { path: 'impressum', component: ImpressumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}

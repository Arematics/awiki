import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {WikiEntryComponent} from '../components/wiki-entry/wiki-entry.component';
import {ImpressumComponent} from '../components/impressum/impressum.component';
import {WikiEntryResolver} from '../_resolver/wikiEntryResolver';
import {WikiEntryGroupResolver} from '../_resolver/wikiEntryGroupResolver';
import {PanelComponent} from '../admin/panel/panel.component';
import {AuthGuard} from '../_helper/auth.guard';
import {PrivacyComponent} from '../components/privacy/privacy.component';
import {NotFoundComponent} from '../components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'entry/:id', component: WikiEntryComponent, resolve: {entry: WikiEntryResolver, group: WikiEntryGroupResolver}},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'admin', component: PanelComponent, canActivate: [AuthGuard], data: { roles: ['admin']}},
  { path: 'error', component: NotFoundComponent},
  { path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRouterModule {}

import { NgModule } from '@angular/core';
import {ImprintModule} from './impressum/imprint.module';
import {HeadModule} from './head/head.module';
import {FooterModule} from './footer/footer.module';
import {PrivacyModule} from './privacy/privacy.module';
import {CookieModule} from './cookie-alert/cookie.module';
import {PipeModule} from '../_pipe/pipe.module';
import {NotFoundComponent} from './notfound/notfound.component';


@NgModule({
  imports: [
    PipeModule
  ],
  exports: [
    ImprintModule,
    PrivacyModule,
    CookieModule,
    HeadModule,
    FooterModule,
    NotFoundComponent
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class BaseComponentModule {}

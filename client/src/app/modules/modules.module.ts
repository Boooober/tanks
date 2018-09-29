import { NgModule } from '@angular/core';

import { TanxModule } from './tanx/tanx.module';
import { LoginModule } from './login/login.module';

@NgModule({
    imports: [
        TanxModule,
        LoginModule
    ],
    providers: []
})
export class ModulesModule {}

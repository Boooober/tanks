import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { LoginRoutingModule, loginRoutingComponents } from './login.routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        loginRoutingComponents
    ]
})
export class LoginModule {}

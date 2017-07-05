import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from '../../../ui-components/ui-components.module';
import { RegistrationRoutingModule, registrationRoutingComponents } from './registration.routing.module';

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        UiComponentsModule,
        RegistrationRoutingModule
    ],
    declarations: [
        registrationRoutingComponents
    ]
})
export class RegistrationModule {}

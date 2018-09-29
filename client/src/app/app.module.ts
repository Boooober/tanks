import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        ModulesModule,
        AppRoutingModule
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}

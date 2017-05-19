import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { GameModule } from './game/game.module';
import { AuthFormModule } from './auth-forms/auth-forms.module';

import { AppComponent } from './app.component';

import { routes } from './app.routes';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GameModule,
        AuthFormModule,
        UIRouterModule.forRoot({ states: [...routes]})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from 'ui-router-ng2';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

import { AuthService } from './auth.service';

/* Routes */
import routes from './auth-forms.routes';

@NgModule({
    declarations: [
        LoginComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UIRouterModule.forChild({ states: [...routes]})
    ],
    providers: [
        AuthService
    ]
})
export class AuthFormModule {}

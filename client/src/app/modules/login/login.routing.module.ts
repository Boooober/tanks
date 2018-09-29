import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

import { CanDeactivateGuard } from '../../shared/guard/can-deactivate.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login to the tanx!'
        }
    },
    {
        path: 'signin',
        component: SigninComponent,
        data: {
            title: 'Signin to the tanx!'
        },
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    }
];

export const loginRoutingComponents = [
    LoginComponent,
    SigninComponent
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule {}

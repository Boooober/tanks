import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

export const routes = [
    {
        url: '/login',
        name: 'login',
        params: { successSignin: null },
        component: LoginComponent
    },
    {
        url: '/signin',
        name: 'signin',
        component: SigninComponent
    }
];

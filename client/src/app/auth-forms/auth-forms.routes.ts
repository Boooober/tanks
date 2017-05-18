import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

export default [
    {
        url: '/login',
        name: 'login',
        component: LoginComponent
    },
    {
        url: '/signin',
        name: 'signin',
        component: SigninComponent
    }
];

import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
    name = '';
    email = '';
    password = '';

    constructor(private AuthService: AuthService,
                private StateService: StateService) {}

    onSubmit() {
        const { name, email, password } = this;
        this.AuthService.signin({ name, email, password })
            .then(() => this.StateService.go('login'));
    }
}

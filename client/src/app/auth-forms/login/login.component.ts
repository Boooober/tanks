import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email = '';
    password = '';

    constructor(private AuthService: AuthService,
                private StateService: StateService) {}

    onSubmit() {
        const { email, password } = this;
        this.AuthService.login({ email, password })
            .then(() => this.StateService.go('game'));
    }
}

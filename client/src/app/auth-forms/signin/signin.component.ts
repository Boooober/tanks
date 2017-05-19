import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';
import { AuthService } from '../auth.service';

const ACCOUNT_ALREADY_EXISTS_EXCEPTION = 'AccountAlreadyExistsException';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
    name = '';
    email = '';
    password = '';

    alreadyExists = false;

    constructor(private AuthService: AuthService,
                private StateService: StateService) {
    }

    onSubmit() {
        const { name, email, password } = this;
        this.AuthService.signin({ name, email, password })
            .then(() => this.StateService.go('login'))
            .catch(response => {
                const error = response.json();
                if (error.type === ACCOUNT_ALREADY_EXISTS_EXCEPTION) {
                    this.alreadyExists = true;
                }
            });
    }

    clearNameErrors() {
        this.alreadyExists = false;
    }
}

import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { AuthService } from '../auth.service';

const WRONG_ACCOUNT_PASSWORD_EXCEPTION = 'WrongAccountPasswordException';
const ACCOUNT_DOES_NOT_EXISTS_EXCEPTION = 'AccountDoesNotExistsException';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login = '';
    password = '';

    doesNotExists = null;
    wrongPassword = null;
    successSignin = null;

    constructor(private AuthService: AuthService,
                private StateService: StateService) {
    }

    ngOnInit() {
        this.successSignin = this.StateService.params['successSignin'];
    }

    onSubmit() {
        const { login, password } = this;
        this.AuthService.login({ name: login, password })
            .then(() => this.StateService.go('game'))
            .catch(response => {
                const error = response.json();
                if (error.type === ACCOUNT_DOES_NOT_EXISTS_EXCEPTION) {
                    this.doesNotExists = true;
                } else if (error.type === WRONG_ACCOUNT_PASSWORD_EXCEPTION) {
                    this.wrongPassword = true;
                }
            });
    }

    clearLoginErrors() {
        this.doesNotExists = false;
    }

    clearPasswordErrors() {
        this.wrongPassword = false;
    }
}

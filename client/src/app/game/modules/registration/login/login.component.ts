import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

const WRONG_ACCOUNT_PASSWORD_EXCEPTION = 'WrongAccountPasswordException';
const ACCOUNT_DOES_NOT_EXISTS_EXCEPTION = 'AccountDoesNotExistsException';

@Component({
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
                private Router: Router,
                private ActivatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.successSignin = this.ActivatedRoute.snapshot.queryParams['successSignin'];
    }

    onSubmit() {
        const { login, password } = this;
        this.AuthService.login({ name: login, password })
            .then(() => this.Router.navigate(['game']))
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { DialogService } from '../../../../ui-components/dialog.service';
import { CanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';

const ACCOUNT_ALREADY_EXISTS_EXCEPTION = 'AccountAlreadyExistsException';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements CanComponentDeactivate {
    name = '';
    password = '';

    alreadyExists = false;

    constructor(private Router: Router,
                private AuthService: AuthService,
                private DialogService: DialogService) {
    }

    onSubmit(): void {
        const { name, password } = this;
        this.AuthService.signin({ name, password })
            .then(() => this.Router.navigate(['login'], { queryParams: { successSignin: true } }))
            .catch(response => {
                const error = response.json();
                if (error.type === ACCOUNT_ALREADY_EXISTS_EXCEPTION) {
                    this.alreadyExists = true;
                }
            });
    }

    clearNameErrors(): void {
        this.alreadyExists = false;
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (this.name && this.password) { return true; }
        return this.DialogService.confirm('Are you sure you want to exit without registration?');
    }
}

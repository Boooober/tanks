import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/internal/operators';

import { Credential, SigninError } from '../../../core/authentication/entity';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
    selector: 'tanx-signin-component',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    form: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    get alreadyExists(): boolean {
        return this.form.errors && this.form.errors.alreadyExists;
    }

    onSubmit(): void {
        const { username, password } = this.form.value;
        const model = new Credential(username, password);

        this.authenticationService.signin(model).pipe(
            tap(() => this.router.navigate(['login'], { queryParams: { successSignin: true } }))
        ).subscribe(
            null,
            (signinError: SigninError) => {
                this.form.setErrors({ alreadyExists: signinError.isAlreadyExists() });
            }
        );
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]]
        });
    }
}

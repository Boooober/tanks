import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/internal/operators';

import { Credential, LoginError } from '../../../core/authentication/entity';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
    selector: 'tanx-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    get successSignin(): boolean {
        return this.activatedRoute.snapshot.queryParams.successSignin;
    }

    get invalidCredential(): boolean {
        return this.form.errors && this.form.errors.invalidCredential;
    }

    onSubmit(): void {
        const { username, password } = this.form.value;
        const model = new Credential(username, password);

        this.authenticationService.login(model).pipe(
            tap(() => this.router.navigate(['game']))
        ).subscribe(
            null,
            (loginError: LoginError) => {
                this.form.setErrors({ invalidCredential: loginError.isWrongCredential() });
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

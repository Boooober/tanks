import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs/index';
import { catchError, map, tap } from 'rxjs/internal/operators';

import { User, UserDto, Credential, LoginError, SigninError } from './entity';

@Injectable()
export class AuthenticationService {

    private user: User;

    constructor(
        private http: HttpClient
    ) {}

    login(credential: Credential): Observable<User> {
        return this.http.post<UserDto>('/api/login', credential).pipe(
            map((response: UserDto) => new User(
                response.id,
                response.name,
                response.email
            )),
            tap((user: User) => this.user = user),
            catchError((error: HttpErrorResponse) => throwError(new LoginError(error.error.type)))
        );
    }

    signin(credential: Credential): Observable<any> {
        return this.http.post('/api/signin', credential).pipe(
            catchError((error: HttpErrorResponse) => throwError(new SigninError(error.error.type)))
        );
    }

    // TODO move to store
    isAuthorized(): boolean {
        return !!this.user;
    }

    getPlayer(): User {
        return this.user;
    }
}

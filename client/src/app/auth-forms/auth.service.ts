import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user.class';

@Injectable()
export class AuthService {
    private user: User;

    constructor(private http: Http) {}

    login(credentials: { email: string, password: string }): Promise<any> {
        return this.http.post('/api/login', credentials).toPromise()
            .then(response => this.user = response.json());
    }

    signin(credentials: { name: string, email: string, password: string }): Promise<any> {
        return this.http.post('/api/signin', credentials).toPromise();
    }

    isAuthorized(): boolean {
        return !! this.user;
    }
}

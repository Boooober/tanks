import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user.class';

@Injectable()
export class AuthService {
    private user: User;

    constructor(private http: Http) {}

    login(credentials: { email: string, password: string }): Promise<any> {
        return this.http.post('/api/login', credentials).toPromise()
            .then(response => {
              const { data } = response.json();
              return this.user = data.user;
            });
    }

    signin(credentials: { name: string, email: string, password: string }): Promise<any> {
        return this.http.post('/api/signin', credentials).toPromise()
          .then(response => response.json())

    }

    isAuthorized(): boolean {
        return !! this.user;
    }

    getUser(): User {
      return this.user;
    }
}

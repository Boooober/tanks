import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Player } from './player.class';

@Injectable()
export class AuthService {
    private player: Player;

    constructor(private http: Http) {}

    login(credentials: Player): Promise<any> {
        return this.http.post('/api/login', credentials).toPromise()
            .then(response => {
              const { data } = response.json();
              return this.player = data;
            });
    }

    signin(credentials: Player): Promise<any> {
        return this.http.post('/api/signin', credentials).toPromise()
          .then(response => response.json());
    }

    isAuthorized(): boolean {
        return !!this.player;
    }

    getPlayer(): Player {
      return this.player;
    }
}

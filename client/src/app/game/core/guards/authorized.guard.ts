import {
    Router,
    CanActivate,
    CanActivateChild,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthorizedGuard implements CanActivate, CanActivateChild {
    constructor(private Router: Router,
                private AuthService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.AuthService.isAuthorized()) { return true; }
        this.Router.navigate(['/auth/login']);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}

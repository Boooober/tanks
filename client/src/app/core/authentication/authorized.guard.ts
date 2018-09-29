import {
    Router,
    CanActivate,
    CanActivateChild,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizedGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isAuthorized()) {
            return true;
        }

        // TODO can we remove it to modules?
        this.router.navigate(['/login']);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}

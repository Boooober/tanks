import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs/index';

@Injectable()
export class BackgroundPreloading implements PreloadingStrategy {
    preload(route: Route, load: () => any): Observable<any> {
        return route.data && route.data.backgroundPreload ? load() : of(null);
    }
}

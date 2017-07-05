import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

@Injectable()
export class BackgroundPreloading implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.backgroundPreload ? load() : Observable.of(null);
    }
}

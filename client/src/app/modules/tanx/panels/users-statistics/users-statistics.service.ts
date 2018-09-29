import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

import { UserStatistics } from './user-statistics.class';

@Injectable()
export class UserStatisticsService {

    constructor(
        private http: HttpClient
    ) {}

    get(): Observable<UserStatistics[]> {
        return this.http.get<UserStatistics[]>('api/game/statistics');
    }
}

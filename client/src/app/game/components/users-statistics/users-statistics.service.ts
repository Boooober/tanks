import { Injectable } from '@angular/core';
import { UserStatistics } from './user-statistics.class';
import {Http} from "@angular/http";

export const STATISTICS_ENDPOINT = 'api/game/statistics';

@Injectable()
export class UserStatisticsService {
    constructor(private http: Http) {}

    getData(): Promise<UserStatistics[]> {
        return this.http.get(STATISTICS_ENDPOINT).toPromise()
            .then(response => response.json().data);
    }
}

import { Component, OnInit } from '@angular/core';
import { UserStatistics } from './user-statistics.class';
import { UserStatisticsService } from './users-statistics.service';
import { Observable } from 'rxjs/index';

@Component({
    selector: 'app-user-statistics',
    templateUrl: './users-statistics.component.html',
    styleUrls: ['./users-statistics.component.scss'],
    providers: [UserStatisticsService]
})
export class UsersStatisticsComponent {

    constructor(
        private userStatisticsService: UserStatisticsService
    ) {}

    getStatistics(): Observable<UserStatistics[]> {
        return this.userStatisticsService.get();
    }
}

import { Component, OnInit } from '@angular/core';
import { UserStatistics } from './user-statistics.class';
import { UserStatisticsService } from './users-statistics.service';

@Component({
    selector: 'app-user-statistics',
    templateUrl: './users-statistics.component.html',
    styleUrls: ['./users-statistics.component.scss'],
    providers: [UserStatisticsService]
})
export class UsersStatisticsComponent implements OnInit {
    public statistics: UserStatistics[] = [];

    constructor (private UserStatisticsService: UserStatisticsService) {}

    ngOnInit() {
        this.queryData();
    }

    queryData() {
        this.UserStatisticsService.getData()
            .then(statistics => {
                this.statistics = statistics;
            });
    }
}

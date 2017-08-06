import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ng2Select } from 'ng2-material-select/dist/src/ng2-select'

import data from '../../data';
import { ChartBarService } from './helpers/chart-bar.service';
import { ChartPieService } from './helpers/chart-pie.service';


@Component({
    selector: 'app-charts',
    providers: [ChartBarService, ChartPieService],
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
    @ViewChild('pie') pie: ElementRef;
    @ViewChild('bars') bars: ElementRef;
    @ViewChild('select') select: Ng2Select;

    options = [
        { entityX: 'username', entityY: 'score', units: 'pts', labelY: 'Score' },
        { entityX: 'username', entityY: 'totalShoots', units: 'times', labelY: 'Total Shots' },
        { entityX: 'username', entityY: 'successShoots', units: 'times', labelY: 'Success Shots' },
        { entityX: 'username', entityY: 'totalDamage', units: 'pts', labelY: 'Total Damage' },
        { entityX: 'username', entityY: 'receivedDamage', units: 'pts', labelY: 'Received Damage' }
    ];
    selected = this.options[0];

    private data;

    constructor(private ChartBarService: ChartBarService,
                private ChartPieService: ChartPieService) {}

    ngOnInit(): void {
        this.data = data;
        this.ChartBarService.createChart(this.bars.nativeElement);
        this.ChartBarService.renderChart(data, this.selected);

        this.ChartPieService.createChart(this.pie.nativeElement);
        this.ChartPieService.renderChart(data, this.selected);

        this.select.onChange.subscribe(option => {
            this.selected = option;
            this.ChartBarService.renderChart(data, this.selected);
            this.ChartPieService.renderChart(data, this.selected);
        });
    }
}

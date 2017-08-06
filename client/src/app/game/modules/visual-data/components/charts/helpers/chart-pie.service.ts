import * as d3 from 'd3';
import { Injectable } from '@angular/core';

import { ChartOptions } from './chart-options.class';
import { ChartsAbstract } from './charts.abstract';

@Injectable()
export class ChartPieService extends ChartsAbstract {
    private arc;
    private labelArc;
    private chart;

    createChart(svg: SVGElement, options?: ChartOptions): void {
        this.setOptions(options);

        const { width, height } = this.options;
        this.chart = d3.select(svg)
                .attr('width', width)
                .attr('height', height)
            .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const radius = d3.min([width, height]) / 2;

        this.arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        this.labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);
    };

    renderChart(data: any, { entityX, entityY }): void {
        const pie = d3.pie()
            .sort(null)
            .value(d => d[entityY]);

        const color = d3.scaleOrdinal()
            .range(['#005242', '#1ab394', '#52d6bb']);

        // const drawPie = selection => {
        //     selection
        //         .append('path')
        //             .attr('class', 'sector')
        //             .attr('d', this.arc)
        //             .style('fill', ({ value }) => color(value));
        //
        //     selection
        //         .append('text')
        //             .attr('transform', d => `translate(${this.labelArc.centroid(d)})`)
        //             .attr('dy', '.35em')
        //             .text(d => d.data[entityY]);
        //             // .text(d => `${d.data[entityX]} (${d.data[entityY]})`);
        // };

        const chart = this.chart
            .selectAll('g.slice')
            .data(pie(data));

        chart.exit()
            .remove();

        const sliceEnter = chart.enter()
            .append('g')
                .attr('class', 'slice');

        sliceEnter
            .append('path')
                .attr('class', 'sector');
        sliceEnter
            .append('text')
                .attr('class', 'label');

        chart.merge(sliceEnter);

        chart.selectAll('path.sector')
            .attr('d', this.arc)
            .style('fill', ({ value }) => color(value));

        chart.selectAll('text.label')
            .attr('d', this.arc)
            .attr('transform', d => `translate(${this.labelArc.centroid(d)})`)
            .attr('dy', '.35em')
            .text(d => d.data[entityY]);
            // .text(d => `${d.data[entityX]} (${d.data[entityY]})`);

        // slice
        //     .data(d => d.data).enter()
        //     // .selectAll('path.sector')
        //     .append('path')
        //     .merge(slice)
        //         .attr('class', 'sector')

    };
}

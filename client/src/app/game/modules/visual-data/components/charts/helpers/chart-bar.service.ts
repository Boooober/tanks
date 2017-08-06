import * as d3 from 'd3';
import { Injectable } from '@angular/core';

import { ChartOptions } from './chart-options.class';
import { ChartsAbstract } from './charts.abstract';

@Injectable()
export class ChartBarService extends ChartsAbstract {
    private x;
    private y;
    private xAxis;
    private yAxis;

    private chart;

    createChart(svg: SVGElement, options?: ChartOptions): void {
        this.setOptions(options);

        let { width, height } = this.options;

        this.chart = d3.select(svg)
                .attr('width', width)
                .attr('height', height)
            .append('g')
                .attr('transform', `translate(${this.options.marginLeft}, ${this.options.marginTop})`);

        width -= this.options.marginLeft + this.options.marginRight;
        height -= this.options.marginTop + this.options.marginBottom;
        Object.assign(this.options, { width, height });

        this.x = d3.scaleBand()
            .rangeRound([0, width]);
        this.y = d3.scaleLinear()
            .range([height, 0]);
        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
    }

    renderChart(data, renderOptions): void {
        this.renderXAxis(data, renderOptions);
        this.renderYAxis(data, renderOptions);
        this.renderBars(data, renderOptions);
    }

    private renderXAxis(data, { entityX }): void {
        this.x.domain(data.map(d => d[entityX]));

        this.chart
            .selectAll('.x.axis')
            .remove();

        this.chart
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this.options.height})`)
            .call(this.xAxis);
    }

    private renderYAxis(data, { entityY, labelY, units }): void {
        this.yAxis
            .ticks(3)
            .tickFormat(d => `${d}`);

        this.y.domain([0, d3.max(data, d => d[entityY])]);

        this.chart
            .selectAll('.y.axis')
            .remove();

        this.chart
            .append('g')
                .attr('class', 'y axis')
                .call(this.yAxis)
            .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(`${labelY}, ${units}`);
    }

    private renderBars(data, { entityX, entityY }): void {
        const space = 6;

        const chart = this.chart
            .selectAll('.bar')
            .data(data);

        chart.exit()
            .remove();

        chart.enter()
            .append('rect')
            .merge(chart)
                .transition()
                .duration(500)
                .ease(d3.easeCubicOut)
                .attr('class', 'bar')
                .attr('x', d => this.x(d[entityX]) + space / 2)
                .attr('width', this.x.bandwidth() - space)
                .attr('y', d => this.y(d[entityY]))
                .attr('height', d => this.options.height - this.y(d[entityY]));
    }
}

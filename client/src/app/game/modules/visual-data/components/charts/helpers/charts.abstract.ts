import { ChartOptions } from './chart-options.class';

export abstract class ChartsAbstract {
    options: ChartOptions;

    setOptions(options?: ChartOptions): void {
        this.options = Object.assign({
            width: 600,
            height: 300,
            marginTop: 40,
            marginRight: 20,
            marginBottom: 30,
            marginLeft: 60
        }, options);
    }

    createChart(svg: SVGElement, options?: ChartOptions): void {};
    renderChart(data: any, renderOptions: any): void {};
}

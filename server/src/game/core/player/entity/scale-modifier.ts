import { Modifier } from './modifier';

export const SCALE_PROPERTIES = [
    'width',
    'height',
    'health',
    'defence',
    'maxHealth',
    'speed',
    'rotateSpeed',
    'attackSpeed',
    'attackPower'
];


export class ScaleModifier extends Modifier {
    public name = 'ScaleModifier';

    constructor(public options: { scale: number }) {
        super(SCALE_PROPERTIES, options);
    }

    handle(property: string, value: any) {
        const { scale } = this.options;

        switch (property) {
            case 'width':
                return this.roundToDecimal(value * scale);
            case 'height':
                return this.roundToDecimal(value * scale);
            case 'health':
                return this.roundToDecimal(value * scale);
            case 'defence':
                return this.roundToDecimal(value * scale);
            case 'maxHealth':
                return this.roundToDecimal(value * scale);
            case 'speed':
                return this.roundToDecimal(value / scale);
            case 'rotateSpeed':
                return this.roundToDecimal(value / scale);
            case 'attackSpeed':
                return this.roundToDecimal(value / scale);
            case 'attackPower':
                return this.roundToDecimal(value * scale);
            default:
                return value;
        }
    }

    private roundToDecimal(number: number, decimal: number = 2): number {
        const digit = Number(`1e${decimal}`);
        return Math.round(number * digit) / digit;
    }
}

export class Modifier {
    public static ABSOLUTE = 1;
    public static RELATIVE = 2;

    public name: string;

    constructor(public properties: string[],
                public options?: object,
                public order = Modifier.ABSOLUTE) {
    }

    handle(property: string, value: any): any {
        return value;
    }
}

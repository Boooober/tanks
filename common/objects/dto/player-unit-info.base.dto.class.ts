export class PlayerUnitInfoBaseDTO {
    public speed: number;
    public width: number;
    public height: number;
    public health: number;
    public defence: number;
    public name: string;
    public maxHealth: number;
    public rotateSpeed: number;
    public attackSpeed: number;
    public attackPower: number;
    public color: { r: number, g: number, b: number };
    public modifiers: Array<{ name: string, options: any }>;
}

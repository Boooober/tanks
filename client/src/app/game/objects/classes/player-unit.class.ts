import { MovingObject } from './moving-object.class';

export class PlayerUnit extends MovingObject {
    static TYPE = 'player';

    public scale: number;
    public username: string;
    public attackSpeed: number;
    public attackPower: number;
    public isAttacking: boolean;
    public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public color: { r: number, g: number, b: number };
}

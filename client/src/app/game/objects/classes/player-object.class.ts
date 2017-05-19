import { MovingObject } from './moving-object.class';

export class PlayerObject extends MovingObject {
    static TYPE = 'player';

    public username: string;
    public fireWait: boolean;
    public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}

import { GameObjectProperties } from './game-object-properties.class';

export class PlayerObject extends GameObjectProperties {
    public fireWait: boolean;
    public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}

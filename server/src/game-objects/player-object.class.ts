import { Playground } from './playground.class';
import { GameObjectProperties } from './game-object-properties.class';

export class PlayerObject extends GameObjectProperties {
  public health: number;
  public rotateSpeed: number;

  public doFire: boolean;
  public canFire: boolean;
  public fireWait: boolean;
  public fireDelay: number;
  public fireSpeed: number;
  public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

  public moveUp: boolean;
  public moveDown: boolean;
  public moveLeft: boolean;
  public moveRight: boolean;

  constructor(options: GameObjectProperties) {
    super();
    Object.assign(this, options);
  }
}

import { GameObjectProperties } from './game-object-properties.class';

export const DEFAULT_PLAYER_OPTIONS = {
  x: 0,
  y: 0,
  deg: 45,
  speed: 2,
  width: 32,
  height: 48,
  health: 100,
  type: 'player',
  doFire: false,
  canFire: true,
  fireWait: false,
  fireDelay: 500,
  fireSpeed: 10,
  rotateSpeed: 3
};

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

  constructor(options?: any) {
    super();
    Object.assign(this, DEFAULT_PLAYER_OPTIONS, options);
  }
}

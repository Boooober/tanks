import { Playground } from './playground.class';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
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

export const DEFAULT_BULLET_OPTIONS = {
  speed: 5,
  width: 2,
  height: 10,
  type: 'bullet'
};

export class GameObjectsService {
  private static objects: GameObjectProperties[] = [];

  static createPlayerObject(): PlayerObject {
    return new PlayerObject(DEFAULT_PLAYER_OPTIONS);
  }

  static addObject(object: GameObjectProperties): void {
      GameObjectsService.objects.push(object);
  }

  static clearObjects(): void {
      GameObjectsService.objects = GameObjectsService.objects.filter(object => !object.remove);
  }
}

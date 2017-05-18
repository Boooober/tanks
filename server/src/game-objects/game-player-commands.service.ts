import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';

import { GameObjectsCalculationsService } from './game-object-calculations.class';

export class GamePlayerCommands {
  static doFire(player: PlayerObject, value: boolean): BulletObject|null {
    player.doFire = value;
    console.log('doFire', value);
    return GameObjectsCalculationsService.isFiring(player)
      ? GameObjectsCalculationsService.playerFire(player)
      : null;
  }

  static moveUp(player: PlayerObject, value: boolean): void {
    console.log('moveUp', value);
    player.moveUp = value;
  }

  static moveLeft(player: PlayerObject, value: boolean): void {
    console.log('moveLeft', value);
    player.moveLeft = value;
  }

  static moveRight(player: PlayerObject, value: boolean): void {
    console.log('moveRight', value);
    player.moveRight = value;
  }

  static moveDown(player: PlayerObject, value: boolean): void {
    console.log('moveDown', value);
    player.moveDown = value;
  }
}

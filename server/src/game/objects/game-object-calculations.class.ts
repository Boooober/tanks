import { PlayerObject } from './player-object.class';
import { BulletObject } from './bullet-object.class';
import { GameObjectProperties } from './game-object-properties.class';

export class GameObjectsCalculationsService {
  static calculateBullet(object: BulletObject): void {
    GameObjectsCalculationsService.moveForward(object);
    if (object.x < 0 ||
      object.y < 0 ||
      object.x > 9999 ||
      object.y > 9999) {
      object.remove = true;
    }
  };

  static calculatePlayer(object: PlayerObject): void {
      if (object.moveLeft) {
          object.deg -= object.rotateSpeed;
      }
      if (object.moveRight) {
          object.deg += object.rotateSpeed;
      }
      if (object.deg < 0) {
          object.deg = 360;
      }
      if (object.deg > 360) {
          object.deg = 0;
      }
      if (object.moveUp) {
        GameObjectsCalculationsService.moveForward(object);
      }
      if (object.moveDown) {
        GameObjectsCalculationsService.moveBackward(object);
      }
  }

  static isFiring(player: PlayerObject): boolean {
    return player.doFire && player.canFire && !player.fireWait;
  }

  static playerFire(player: PlayerObject): BulletObject {
    player.fireWait = true;
    setTimeout(() => {
      player.fireWait = false;
    }, player.fireDelay);

    return new BulletObject({
      x: player.x + (player.width / 2),
      y: player.y + (player.height / 2),
      deg: player.deg,
      speed: player.fireSpeed,
      shooter: player
    });
  }

  private static moveForward(object: GameObjectProperties) {
    object.x += object.speed * Math.sin(object.deg * (Math.PI / 180));
    object.y -= object.speed * Math.cos(object.deg * (Math.PI / 180));
  }

  private static moveBackward(object: GameObjectProperties) {
    object.x -= object.speed * Math.sin(object.deg * (Math.PI / 180));
    object.y += object.speed * Math.cos(object.deg * (Math.PI / 180));
  }
}

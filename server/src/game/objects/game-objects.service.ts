import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GameObjectProperties } from './game-object-properties.class';
import { GameObjectsCalculationsService } from './game-object-calculations.class';

export class GameObjectsService {
  static objects: GameObjectProperties[] = [];

  static update(): void {
    GameObjectsService.clearObjects();
    GameObjectsService.objects.forEach(object => {
      switch (object.type) {
        case 'bullet':
          GameObjectsCalculationsService.calculateBullet(object as BulletObject);
          break;
        case 'player':
          GameObjectsCalculationsService.calculatePlayer(object as PlayerObject);
          break;
        default:
      }
    });
  }

  static createPlayerObject(): PlayerObject {
    const startPoint = {
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500)
    };
    return new PlayerObject(startPoint);
  }

  static addObject(object: GameObjectProperties): void {
      GameObjectsService.objects.push(object);
  }

  static clearObjects(): void {
      GameObjectsService.objects = GameObjectsService.objects.filter(object => !object.remove);
  }
}

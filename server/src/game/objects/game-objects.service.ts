import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GameObjectProperties } from './game-object-properties.class';
import { GameObjectsCalculationsService } from './game-object-calculations.class';

export class GameObjectsService {
  objects: GameObjectProperties[] = [];

  update(): void {
    this.clearObjects();
    this.objects.forEach(object => {
      switch (object.type) {
        case 'bullet':
          GameObjectsCalculationsService.calculateBullet(object as BulletObject);
          GameObjectsCalculationsService.calculateCollustions(object as BulletObject, this.objects);

          break;
        case 'player':
          GameObjectsCalculationsService.calculatePlayer(object as PlayerObject);
          break;
        default:
      }
    });
  }

  createPlayerObject(): PlayerObject {
    const startPoint = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 700)
    };
    return new PlayerObject(startPoint);
  }

  addObject(object: GameObjectProperties): void {
      this.objects.push(object);
  }

  clearObjects(): void {
    this.objects = this.objects.filter(object => !object.remove);
  }
}

export default new GameObjectsService;

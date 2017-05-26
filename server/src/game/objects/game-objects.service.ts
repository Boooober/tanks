import { BaseObject } from './classes/base-object.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';
import GameObjectsCalculationsService from './game-objects-calculations.service';

export class GameObjectsService {
    public objects: BaseObject[] = [];

    /**
     * Updating from game loop
     * @see GameLoop
     */
    update(): void {
        this.clearObjects();
        this.objects.forEach(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    GameObjectsCalculationsService.calculateBullet(object as BulletObject);
                    GameObjectsCalculationsService.calculateBulletCollisions(object as BulletObject, this.objects);
                    break;
                case PlayerObject.TYPE:
                    GameObjectsCalculationsService.calculatePlayer(object as PlayerObject);
                    GameObjectsCalculationsService.calculatePlayerCollisions(object as PlayerObject, this.objects);
                    break;
            }
        });
    }

    addObject(object: BaseObject | null): void {
        if (object) {
            this.objects.push(object);
        }
    }

    clearObjects(): void {
        this.objects = this.objects.filter(object => !object.remove);
    }
}

export default new GameObjectsService;

import { Injectable } from 'injection-js';
import {
    BaseObject,
    PlayerUnit,
    BulletObject
} from './entity';

import { BulletObjectDTO } from './entity/dto/bullet-object.dto.class';
import { PlayerUnitObjectDTO } from './entity/dto/player-unit-object.dto.class';

import { GameObjectsCalculationsService } from './calculation/game-objects-calculations.service';

@Injectable()
export class GameObjectsService {

    public objects: BaseObject[] = [];

    constructor(
        private gameObjectsCalculationsService: GameObjectsCalculationsService
    ) {}

    /**
     * @see GameLoopService
     */
    update(): void {
        this.filterObjects();
        this.objects.forEach((object: BaseObject) => {
            switch (object.type) {
                case BulletObject.TYPE:
                    this.gameObjectsCalculationsService.calculateBullet(object as BulletObject);
                    this.gameObjectsCalculationsService.calculateBulletCollisions(object as BulletObject, this.objects);
                    break;
                case PlayerUnit.TYPE:
                    this.gameObjectsCalculationsService.calculatePlayer(object as PlayerUnit);
                    this.gameObjectsCalculationsService.calculatePlayerCollisions(object as PlayerUnit, this.objects);
                    break;
            }
        });
    }

    add(object: BaseObject): void {
        this.objects.push(object);
    }

    clear(): void {
        this.objects = [];
    }

    getDto(): Array<BulletObjectDTO | PlayerUnitObjectDTO> {
        return this.objects.map((object: BaseObject) => {
            switch (object.type) {
                case BulletObject.TYPE:
                    return new BulletObjectDTO(object as BulletObject);
                case PlayerUnit.TYPE:
                    return new PlayerUnitObjectDTO(object as PlayerUnit);
            }
        });
    }

    private filterObjects(): void {
        this.objects = this.objects.filter((object: BaseObject) => object.exists());
    }
}

import { BaseObject } from './classes/base-object.class';
import { PlayerUnit } from './classes/player-unit.class';
import { BulletObject } from './classes/bullet-object.class';
import { BulletObjectDTO } from './dto/bullet-object.dto.class';
import { PlayerUnitObjectDTO } from './dto/player-unit-object.dto.class';
import GameObjectsCalculations, { GameObjectsCalculationsService } from './game-objects-calculations.service';

export class GameObjectsService {
    public objects: BaseObject[] = [];

    constructor(private GameObjectsCalculationsService: GameObjectsCalculationsService) {
    }

    /**
     * @see GameLoopService
     */
    update(): void {
        this.filterObjects();
        this.objects.forEach(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    this.GameObjectsCalculationsService.calculateBullet(object as BulletObject);
                    this.GameObjectsCalculationsService.calculateBulletCollisions(object as BulletObject, this.objects);
                    break;
                case PlayerUnit.TYPE:
                    this.GameObjectsCalculationsService.calculatePlayer(object as PlayerUnit);
                    this.GameObjectsCalculationsService.calculatePlayerCollisions(object as PlayerUnit, this.objects);
                    break;
            }
        });
    }

    add(object: BaseObject | null): void {
        if (object) { this.objects.push(object); }
    }

    clear(): void {
        this.objects = [];
    }

    getDto(): Array<BulletObjectDTO | PlayerUnitObjectDTO> {
        return this.objects.map(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    return new BulletObjectDTO(object as BulletObject);
                case PlayerUnit.TYPE:
                    return new PlayerUnitObjectDTO(object as PlayerUnit);
            }
        })
    }

    private filterObjects(): void {
        this.objects = this.objects.filter(object => object.exists());
    }
}

export default new GameObjectsService(GameObjectsCalculations);

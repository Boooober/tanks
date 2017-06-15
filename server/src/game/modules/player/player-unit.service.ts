import { Player } from '../../classes/player.class';
import { BulletObject } from '../../objects/classes/bullet-object.class';
import { PlayerUnit, DEFAULT_UNIT_OPTIONS } from '../../objects/classes/player-unit.class';
import GameObject, { GameObjectsService } from '../../objects/game-objects.service';
import GameObjectsCalculation, { GameObjectsCalculationsService } from '../../objects/game-objects-calculations.service';

export class PlayerUnitService {
    constructor(private GameObjectsService: GameObjectsService,
                private GameObjectsCalculationsService: GameObjectsCalculationsService) {
    }

    create(player: Player): void {
        player.unit = new PlayerUnit(
            { objectId: player.id, username: player.name, sessionId: player.sessionId },
            this.GameObjectsCalculationsService.getRandomPosition(),
            this.resetUnit(player.unit)
        );
        this.GameObjectsService.addObject(player.unit);
    }

    removeUnit(unit: PlayerUnit): void {
        unit.remove = true;
    }

    executeAction(player: Player, data: { action: number, value: any }): void {
        if (!player) {
            return;
        }
        const { unit } = player;
        const { action, value } = data;

        if (this.isDeadUnit(unit)) {
            switch (action) {
                // Restart
                case 82:
                    this.create(player);
                    break;
            }
        } else {
            switch (action) {
                // Do fire
                case 13:
                case 32:
                    this.GameObjectsService.addObject(this.doAttack(unit, value));
                    break;

                // Move up
                case 38:
                case 87:
                    this.moveUp(unit, value);
                    break;

                // Move left
                case 37:
                case 65:
                    this.moveLeft(unit, value);
                    break;

                // Move right
                case 39:
                case 68:
                    this.moveRight(unit, value);
                    break;

                // Move down
                case 40:
                case 83:
                    this.moveDown(unit, value);
                    break;
            }
        }
    }

    doAttack(unit: PlayerUnit, value: boolean): BulletObject | null {
        return value && unit.canAttack
            ? this.GameObjectsCalculationsService.attack(unit)
            : null;
    }

    moveUp(unit: PlayerUnit, value: boolean): void {
        unit.moveUp = value;
    }

    moveLeft(unit: PlayerUnit, value: boolean): void {
        unit.moveLeft = value;
    }

    moveRight(unit: PlayerUnit, value: boolean): void {
        unit.moveRight = value;
    }

    moveDown(unit: PlayerUnit, value: boolean): void {
        unit.moveDown = value;
    }

    private isDeadUnit(unit: PlayerUnit): boolean {
        return unit.remove;
    }

    private resetUnit(unit: PlayerUnit): PlayerUnit {
        return Object.keys(DEFAULT_UNIT_OPTIONS).reduce((resetUnit, key) => {
            if (unit.hasOwnProperty(key)) {
                if (key === 'health') {
                    resetUnit.health = unit.health > 0 ? unit.health : DEFAULT_UNIT_OPTIONS.health;
                } else {
                    resetUnit[key] = unit[key];
                }
            }
            return resetUnit;
        }, {} as PlayerUnit);
    }
}

export default new PlayerUnitService(
    GameObject,
    GameObjectsCalculation
);

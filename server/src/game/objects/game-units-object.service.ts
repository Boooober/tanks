import { Player } from '../classes/player.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject, DEFAULT_UNIT_OPTIONS } from './classes/player-object.class';
import GameObjectsService from './game-objects.service';
import GameObjectsCalculationsService from './game-objects-calculations.service';

// export const ACTIONS_MAP = {
//     37: 'moveLeft',
//     65: 'moveLeft',
//     39: 'moveRight',
//     68: 'moveRight',
//     38: 'moveUp',
//     87: 'moveUp',
//     40: 'moveDown',
//     83: 'moveDown',
//     32: 'doFire',
//     13: 'doFire',
//     82: 'restart'
// };

class GameUnitsObjectService {
    create(sessionId: string, player: Player): void {
        player.unit = new PlayerObject(
            { objectId: player.id, username: player.name },
            GameObjectsCalculationsService.getRandomPosition(),
            this.resetUnit(player.unit)
        );
        GameObjectsService.addObject(player.unit);
    }

    remove(unit: PlayerObject): void {
        unit.remove = true;
    }

    executeAction(sessionId: string, player: Player, data: { action: number, value: any }): void {
        const { unit } = player;
        const { action, value } = data;

        if (this.isDeadUnit(unit)) {
            switch (action) {
                // Restart
                case 82:
                    this.create(sessionId, player);
                    break;
            }
        } else {
            switch (action) {
                // Do fire
                case 13:
                case 32:
                    GameObjectsService.addObject(this.doAttack(unit, value));
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

    doAttack(unit: PlayerObject, value: boolean): BulletObject | null {
        return value && unit.canAttack
            ? GameObjectsCalculationsService.attack(unit)
            : null;
    }

    moveUp(unit: PlayerObject, value: boolean): void {
        unit.moveUp = value;
    }

    moveLeft(unit: PlayerObject, value: boolean): void {
        unit.moveLeft = value;
    }

    moveRight(unit: PlayerObject, value: boolean): void {
        unit.moveRight = value;
    }

    moveDown(unit: PlayerObject, value: boolean): void {
        unit.moveDown = value;
    }

    private isDeadUnit(unit: PlayerObject): boolean {
        return unit.remove;
    }

    private resetUnit(unit: PlayerObject): PlayerObject {
        return Object.keys(DEFAULT_UNIT_OPTIONS).reduce((resetUnit, key) => {
            if (unit.hasOwnProperty(key)) {
                if (key === 'health') {
                    resetUnit.health = unit.health > 0 ? unit.health : DEFAULT_UNIT_OPTIONS.health;
                } else {
                    resetUnit[key] = unit[key];
                }
            }
            return resetUnit;
        }, {} as PlayerObject);
    }
}

export default new GameUnitsObjectService;

import { Player } from '../../classes/player.class';
import { BulletObject } from '../../objects/classes/bullet-object.class';
import { PlayerUnit } from '../../objects/classes/player-unit.class';
import GameObject, { GameObjectsService } from '../../objects/game-objects.service';
import GameObjectsCalculation, { GameObjectsCalculationsService } from '../../objects/game-objects-calculations.service';

import { VIRTUAL_KEY_CODES as KEY } from '../../../../../common/constants/virtual-key-codes.constant';

export class UnitManipulationsService {
    constructor(private GameObjectsService: GameObjectsService,
                private GameObjectsCalculationsService: GameObjectsCalculationsService) {
    }

    create(player: Player): void {
        player.unit = new PlayerUnit({
            objectId: player.id,
            username: player.name,
            sessionId: player.sessionId
        });
        this.GameObjectsService.add(player.unit);
    }

    removeUnit(unit: PlayerUnit): void {
        unit.remove();
    }

    executeAction(player: Player, data: { action: number, value: any }): void {
        if (!player) {
            return;
        }
        const { unit } = player;
        const { action, value } = data;

        if (!unit.exists()) {
            switch (action) {
                case KEY.R:
                    this.create(player);
                    break;
            }
        } else {
            switch (action) {
                case KEY.SPACE:
                case KEY.ENTER:
                    this.GameObjectsService.add(this.doAttack(unit, value));
                    break;
                case KEY.W:
                case KEY.UP:
                    this.moveUp(unit, value);
                    break;
                case KEY.A:
                case KEY.LEFT:
                    this.moveLeft(unit, value);
                    break;
                case KEY.D:
                case KEY.RIGHT:
                    this.moveRight(unit, value);
                    break;
                case KEY.S:
                case KEY.DOWN:
                    this.moveDown(unit, value);
                    break;
                case KEY.R:
                    if (value && unit.canResurrect) {
                        unit.resurrect();
                    }
                    break;
            }
        }
    }

    doAttack(playerUnit: PlayerUnit, value: boolean): BulletObject | null {
        return value && playerUnit.canAttack
            ? this.GameObjectsCalculationsService.attack(playerUnit)
            : null;
    }

    moveUp(playerUnit: PlayerUnit, value: boolean): void {
        playerUnit.moveUp = value;
    }

    moveLeft(playerUnit: PlayerUnit, value: boolean): void {
        playerUnit.moveLeft = value;
    }

    moveRight(playerUnit: PlayerUnit, value: boolean): void {
        playerUnit.moveRight = value;
    }

    moveDown(playerUnit: PlayerUnit, value: boolean): void {
        playerUnit.moveDown = value;
    }
}

export default new UnitManipulationsService(
    GameObject,
    GameObjectsCalculation
);

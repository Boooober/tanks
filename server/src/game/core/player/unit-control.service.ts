import { Injectable } from 'injection-js';
import {
    Player,
    PlayerUnit,
    BulletObject,
    GameObjectsService,
    GameObjectsCalculationsService
} from 'Core';

import { KEYBOARD_CODES as KEY } from 'Constants';


@Injectable()
export class UnitControlService {
    constructor(private gameObjectsService: GameObjectsService,
                private gameObjectsCalculationsService: GameObjectsCalculationsService) {
    }

    create(player: Player): void {
        player.unit = new PlayerUnit({
            objectId: player.id,
            username: player.name,
            sessionId: player.sessionId
        });
        this.gameObjectsService.add(player.unit);
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
                    this.gameObjectsService.add(this.doAttack(unit, value));
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
            ? this.gameObjectsCalculationsService.attack(playerUnit)
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

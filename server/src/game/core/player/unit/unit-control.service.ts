import { Injectable } from 'injection-js';

import { UnitActionType } from './entity';
import { BulletObject, PlayerUnit } from '../entity';

import { GameObjectsService } from '../game-objects.service';

interface IUnitAction {
    [key: number]: (unit: PlayerUnit) => any;
}

@Injectable()
export class UnitControlService {

    deadActions: IUnitAction = {
        [UnitActionType.RESURRECT]: (unit: PlayerUnit) => this.gameObjectsService.add(unit.recreate())
    };

    aliveActions: IUnitAction = {
        [UnitActionType.START_MOVE_UP]: (unit: PlayerUnit) => unit.moveUp = true,
        [UnitActionType.START_MOVE_LEFT]: (unit: PlayerUnit) => unit.moveLeft = true,
        [UnitActionType.START_MOVE_RIGHT]: (unit: PlayerUnit) => unit.moveRight = true,
        [UnitActionType.START_MOVE_DOWN]: (unit: PlayerUnit) => unit.moveDown = true,
        [UnitActionType.STOP_MOVE_UP]: (unit: PlayerUnit) => unit.moveUp = false,
        [UnitActionType.STOP_MOVE_LEFT]: (unit: PlayerUnit) => unit.moveLeft = false,
        [UnitActionType.STOP_MOVE_RIGHT]: (unit: PlayerUnit) => unit.moveRight = false,
        [UnitActionType.STOP_MOVE_DOWN]: (unit: PlayerUnit) => unit.moveDown = false,

        [UnitActionType.RESURRECT]: (unit: PlayerUnit) => unit.canResurrect && unit.resurrect(),
        [UnitActionType.SHOOTING]: (unit: PlayerUnit) => (
            unit.canAttack && this.gameObjectsService.add(new BulletObject(unit.doAttack()))
        )
    };

    constructor(
        private gameObjectsService: GameObjectsService
    ) {}

    executeAction(unit: PlayerUnit, action: UnitActionType): void {
        if (action !== UnitActionType.NONE) {
            const actions = unit.exists() ? this.aliveActions : this.deadActions;
            if (actions[action]) {
                actions[action](unit);
            }
        }
    }
}

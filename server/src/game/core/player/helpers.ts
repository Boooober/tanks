import { KeyboardCode } from '../../../core/constants';

import { IPlayerAction } from './entity';
import { UnitActionType } from './unit/entity';

export const mapPlayerActionToUnit = (playerAction: IPlayerAction): UnitActionType => {
    const { action, value } = playerAction;
    switch (Number(action)) {
        case KeyboardCode.SPACE:
        case KeyboardCode.ENTER:
            return value ? UnitActionType.SHOOTING : UnitActionType.NONE;
        case KeyboardCode.W:
        case KeyboardCode.UP:
            return value ? UnitActionType.START_MOVE_UP : UnitActionType.STOP_MOVE_UP;
        case KeyboardCode.A:
        case KeyboardCode.LEFT:
            return value ? UnitActionType.START_MOVE_LEFT : UnitActionType.STOP_MOVE_LEFT;
        case KeyboardCode.D:
        case KeyboardCode.RIGHT:
            return value ? UnitActionType.START_MOVE_RIGHT : UnitActionType.STOP_MOVE_RIGHT;
        case KeyboardCode.S:
        case KeyboardCode.DOWN:
            return value ? UnitActionType.START_MOVE_DOWN : UnitActionType.STOP_MOVE_DOWN;
        case KeyboardCode.R:
            return value ? UnitActionType.RESURRECT : UnitActionType.NONE;
        default:
            return UnitActionType.NONE;
    }
};

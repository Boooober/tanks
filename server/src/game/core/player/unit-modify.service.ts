import { Injectable } from 'injection-js';
import { PlayerUnit } from 'Core';
import { Modifier } from '../objects/modifiers/modifier.class';


@Injectable()
export class UnitModifyService {
    updateModifier(playerUnit: PlayerUnit, modifier: Modifier): void {
        playerUnit.updateModifier(modifier);
    }
}

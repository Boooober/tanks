import { Injectable } from 'injection-js';

import { Modifier, PlayerUnit } from '../entity';

@Injectable()
export class UnitModifyService {

    updateModifier(playerUnit: PlayerUnit, modifier: Modifier): void {
        playerUnit.updateModifier(modifier);
    }
}

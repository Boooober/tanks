import { HostListener, Injectable } from '@angular/core';

import { User } from './user.class';
import { PlayerObject } from '../game-objects/player-object.class';
import { GameObjectsService } from '../game-objects/game-objects.service';

// import { Playground } from './playground.class';
// import { BulletObject } from './bullet-object.class';
// import { GameObjectAbstract } from './game-object-abstract.class';


@Injectable()
export class UserService {
    private unit: PlayerObject;

    constructor(private GameObjectsService: GameObjectsService) {}

    createUnit(options) {
        this.unit = this.GameObjectsService.createPlayer(options);
    }

    startAction(event: KeyboardEvent) {
        this.GameObjectsService.startAction(this.unit, event);
    }

    finishAction(event: KeyboardEvent) {
        this.GameObjectsService.finishAction(this.unit, event);
    }
}

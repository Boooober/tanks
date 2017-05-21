import { Subscription } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { BaseObject } from '../../objects/classes/base-object.class';
import { UserConnectionService } from '../../connection/user-connection.service';

export const ACTION_KEYS = {
    37: 'moveLeft',
    65: 'moveLeft',
    39: 'moveRight',
    68: 'moveRight',
    38: 'moveUp',
    87: 'moveUp',
    40: 'moveDown',
    83: 'moveDown',
    32: 'doFire',
    13: 'doFire'
};

@Injectable()
export class GameAreaService {
    private actionCache = {};
    private objectsSubscription: Subscription;

    constructor(private UserConnectionService: UserConnectionService) {
        this.UserConnectionService.connect();
    }

    subscribe(callback: (objects: BaseObject[]) => void): void {
        this.objectsSubscription = this.UserConnectionService.getObjectsStream()
            .subscribe((objects: BaseObject[]) => callback(objects));
    }

    unsubscribe(): void {
        this.objectsSubscription.unsubscribe();
    }

    startAction(event: KeyboardEvent) {
        const action = this.getActionToSend(event);
        if (action && this.actionCache[action] !== true) {
            this.actionCache[action] = true;
            this.UserConnectionService.startAction(action);
        }
    }

    finishAction(event: KeyboardEvent) {
        const action = this.getActionToSend(event);
        if (action && this.actionCache[action] !== false) {
            this.actionCache[action] = false;
            this.UserConnectionService.finishAction(action);
        }
    }

    private getActionToSend(event: KeyboardEvent): string {
        const { keyCode } = event;
        return ACTION_KEYS[keyCode];
    }
}

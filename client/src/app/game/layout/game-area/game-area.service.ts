import { Subscription } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { BaseObject } from '../../objects/classes/base-object.class';
import { UserConnectionService } from '../../connection/user-connection.service';

@Injectable()
export class GameAreaService {
    private commandsCache = {};
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
        const { keyCode } = event;
        if (this.commandsCache[keyCode] !== true) {
            this.commandsCache[keyCode] = true;
            this.UserConnectionService.startAction(keyCode);
        }
    }

    finishAction(event: KeyboardEvent) {
        const { keyCode } = event;
        if (this.commandsCache[keyCode] !== false) {
            this.commandsCache[keyCode] = false;
            this.UserConnectionService.finishAction(keyCode);
        }
    }
}

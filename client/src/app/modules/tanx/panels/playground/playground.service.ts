import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { SocketConnection } from '../../../../core/socket/socket-connection';
import { StreamData } from '../../../../core/socket/entity';

import { BaseObject } from '../../entity/base-object';
import { SocketCommand } from '../../../../../../../common/socket-command.enum';

@Injectable()
export class PlaygroundService {

    private commandsCache: object = {};
    private objectsSubscription: Subscription = new Subscription();

    constructor(
        private socketConnection: SocketConnection
    ) {}

    subscribe(callback: (objects: BaseObject[]) => void): void {
        this.objectsSubscription = this.socketConnection
            .get(SocketCommand.OBJECT_UPDATES)
            .subscribe(callback);
    }

    unsubscribe(): void {
        this.objectsSubscription.unsubscribe();
    }

    startAction(event: KeyboardEvent): void {
        const { keyCode } = event;
        if (this.commandsCache[keyCode] !== true) {
            this.commandsCache[keyCode] = true;
            this.socketConnection.send(
                new StreamData(
                    SocketCommand.UNIT_ACTION,
                    { action: keyCode.toString(), value: true }
                )
            );
        }
    }

    finishAction(event: KeyboardEvent): void {
        const { keyCode } = event;
        if (this.commandsCache[keyCode] !== false) {
            this.commandsCache[keyCode] = false;
            this.socketConnection.send(
                new StreamData(
                    SocketCommand.UNIT_ACTION,
                    { action: keyCode.toString(), value: false }
                )
            );
        }
    }
}

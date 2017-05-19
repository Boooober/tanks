import { Injectable } from '@angular/core';

import { BaseObject } from './classes/base-object.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';
import { GameObjectsRendererService } from './renderers/game-object-renderer.service';
import { UserConnectionService } from '../connection/user-connection.service';

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
export class GameObjectsService {
    private images = {};
    private actionCache = {};

    constructor(private UserConnectionService: UserConnectionService) {
        this.UserConnectionService.connect();
    }

    draw(context: CanvasRenderingContext2D, objects: BaseObject[]) {
        objects.forEach(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    GameObjectsRendererService.drawBullet(context, object as BulletObject);
                    break;
                case PlayerObject.TYPE:
                    GameObjectsRendererService.drawPlayer(context, object as PlayerObject, this.images);
                    break;
                default:
            }
        });
    }

    setImages(images) {
        this.images = images;
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

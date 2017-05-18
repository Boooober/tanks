import { Injectable } from '@angular/core';

import { ConnectionService } from '../connection/connection.service';
import { GameObjectProperties } from './game-object-properties.class';
import { GameObjectsRendererService } from './game-object-renderer.service';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';

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

  private actionCache = {};

  constructor(private ConnectionService: ConnectionService) {
    this.ConnectionService.connect();
  }

  draw(context: CanvasRenderingContext2D, object: GameObjectProperties) {
    switch (object.type) {
      case 'bullet':
        GameObjectsRendererService.drawBullet(context, object as BulletObject);
        break;
      case 'player':
        GameObjectsRendererService.drawPlayer(context, object as PlayerObject);
        break;
      default:
    }
  }

  startAction(event: KeyboardEvent) {
    const action = GameObjectsService.getActionToSend(event);
    if (action && this.actionCache[action] !== true) {
      this.actionCache[action] = true;
      this.ConnectionService.startAction(action)
    }
  }

  finishAction(event: KeyboardEvent) {
    const action = GameObjectsService.getActionToSend(event);
    if (action && this.actionCache[action] !== false) {
      this.actionCache[action] = false;
      this.ConnectionService.finishAction(action)
    }
  }

  private static getActionToSend(event: KeyboardEvent): string {
    const {keyCode} = event;
    return ACTION_KEYS[keyCode];
  }
}

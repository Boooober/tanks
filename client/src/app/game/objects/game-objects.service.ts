import { Injectable } from '@angular/core';

import { BaseObject } from './classes/base-object.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';
import { GameObjectsRendererService } from './renderers/game-object-renderer.service';


@Injectable()
export class GameObjectsService {
    draw(context: CanvasRenderingContext2D, objects: BaseObject[], images: Object) {
        objects.forEach(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    GameObjectsRendererService.drawBullet(context, object as BulletObject);
                    break;
                case PlayerObject.TYPE:
                    GameObjectsRendererService.drawPlayer(context, object as PlayerObject, images);
                    break;
                default:
            }
        });
    }
}

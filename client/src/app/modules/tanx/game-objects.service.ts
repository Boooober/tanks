import { Injectable } from '@angular/core';

import { BaseObject } from './entity/base-object';
import { PlayerUnit } from './entity/player-unit';
import { BulletObject } from './entity/bullet-object';
import { GameObjectsRendererService } from './renderers/game-object-renderer.service';

@Injectable()
export class GameObjectsService {
    draw(context: CanvasRenderingContext2D, objects: BaseObject[], images: object): void {
        objects.forEach((object: BaseObject) => {
            switch (object.type) {
                case BulletObject.TYPE:
                    GameObjectsRendererService.drawBullet(context, object as BulletObject);
                    break;
                case PlayerUnit.TYPE:
                    GameObjectsRendererService.drawPlayer(context, object as PlayerUnit, images);
                    break;
                default:
            }
        });
    }
}

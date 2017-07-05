import { PlayerUnit } from '../classes/player-unit.class';
import { BulletObject } from '../classes/bullet-object.class';
import { PlayerObjectsRendererService } from './player-object-renderer.service';


export class GameObjectsRendererService {
    static drawBullet(context: CanvasRenderingContext2D, object: BulletObject): void {
        context.save();
        context.beginPath();
        context.translate(object.centerX, object.centerY);
        context.rotate(object.deg * Math.PI / 180);
        context.fillStyle = 'rgb(255,200,0)';
        context.fillRect(-object.width / 2, -object.height / 2, object.width, object.height);
        // context.drawImage(object.image, -object.width / 2, -object.height / 2);
        context.restore();
    };

    static drawPlayer(context: CanvasRenderingContext2D, object: PlayerUnit, images): void {
        PlayerObjectsRendererService.drawUnit(context, object, images);
        PlayerObjectsRendererService.drawHealth(context, object);
        PlayerObjectsRendererService.drawUsername(context, object);
    }
}

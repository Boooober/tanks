import { PlayerObject } from './player-object.class';
import { BulletObject } from './bullet-object.class';

export class GameObjectsRendererService {
  static drawBullet(context: CanvasRenderingContext2D, object: BulletObject): void {
    context.save();
    context.beginPath();
    context.translate(object.x + object.width / 2, object.y + object.height / 2);
    context.rotate(object.deg * Math.PI / 180);
    context.fillStyle = 'rgb(255,200,0)';
    context.fillRect(-object.width / 2, -object.height / 2, object.width, object.height);
    // context.drawImage(object.image, -object.width / 2, -object.height / 2);
    context.restore();
  };

  static drawPlayer(context: CanvasRenderingContext2D, object: PlayerObject): void {
    context.save();
    context.beginPath();
    context.translate(object.x + object.width / 2, object.y + object.height / 2);
    context.rotate(object.deg * Math.PI / 180);

    const img = object.fireWait ? object.fireImage : object.image;
    context.drawImage(img, -object.width / 2, -object.height / 2);
    context.restore();
  }
}

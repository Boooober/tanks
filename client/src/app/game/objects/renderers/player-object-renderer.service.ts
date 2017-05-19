import { PlayerObject } from '../classes/player-object.class';

export const USERNAME_OFFSET = -16;
export const USERNAME_FONT = '12px Arial';
export const USERNAME_FONT_STYLE = 'white';

export const HEALTH_WIDTH = 45;
export const HEALTH_HEIGHT = 7;
export const HEALTH_OFFSET = -10;
export const HEALTH_FILL_STYLE = '#2cb32c';
export const HEALTH_STROKE_STYLE = '#095a09';

export class PlayerObjectsRendererService {
    static drawUnit(context: CanvasRenderingContext2D, object: PlayerObject, images): void {
        context.save();
        context.beginPath();
        context.translate(object.centerX, object.centerY);
        context.rotate(object.deg * Math.PI / 180);
        const img = object.fireWait ? images.tankFire : images.tank;
        context.drawImage(img, -object.width / 2, -object.height / 2);
        context.restore();
    }

    static drawUsername(context: CanvasRenderingContext2D, object: PlayerObject): void {
        context.save();
        context.beginPath();
        context.font = USERNAME_FONT;
        context.fillStyle = USERNAME_FONT_STYLE;
        const text = object.username;
        const textX = object.centerX - context.measureText(text).width / 2;
        const textY = object.y + USERNAME_OFFSET;
        context.fillText(text, textX, textY);
        context.restore();
    }

    static drawHealth(context: CanvasRenderingContext2D, object: PlayerObject): void {
        context.save();
        context.beginPath();
        context.fillStyle = HEALTH_FILL_STYLE;
        context.strokeStyle = HEALTH_STROKE_STYLE;
        const healthX = object.centerX - HEALTH_WIDTH / 2;
        const healthY = object.y + HEALTH_OFFSET;
        context.fillRect(healthX, healthY, HEALTH_WIDTH * object.health / 100, HEALTH_HEIGHT);
        context.strokeRect(healthX, healthY, HEALTH_WIDTH, HEALTH_HEIGHT);
        context.restore();
    }
}

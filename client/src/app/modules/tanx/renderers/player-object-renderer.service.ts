import { PlayerUnit } from '../entity/player-unit';
import { ObjectRendererHelperService } from './object-renderer-helper.service';

export const USERNAME_OFFSET = -16;
export const USERNAME_FONT = '12px Arial';
export const USERNAME_FONT_STYLE = 'white';

export const HUNDRED_HEALTH_WIDTH = 45;
export const HEALTH_HEIGHT = 7;
export const HEALTH_OFFSET_TOP = -10;
export const HEALTH_FILL_STYLE = '#2cb32c';
export const HEALTH_STROKE_STYLE = '#095a09';

export class PlayerObjectsRendererService {

    static drawUnit(context: CanvasRenderingContext2D, playerUnit: PlayerUnit, images: any): void {
        context.save();
        context.beginPath();
        context.translate(playerUnit.centerX, playerUnit.centerY);
        context.rotate(playerUnit.deg * Math.PI / 180);
        const img = playerUnit.isAttacking ? images.tankFire : images.tank;

        ObjectRendererHelperService.scaleImage(
            context,
            img,
            playerUnit.width,
            playerUnit.height,
            1
        );

        context.restore();
    }

    static drawUsername(context: CanvasRenderingContext2D, playerUnit: PlayerUnit): void {
        context.save();
        context.beginPath();
        context.font = USERNAME_FONT;
        context.fillStyle = USERNAME_FONT_STYLE;
        const text = playerUnit.username;
        const textX = playerUnit.centerX - context.measureText(text).width / 2;
        const textY = playerUnit.y + USERNAME_OFFSET;
        context.fillText(text, textX, textY);
        context.restore();
    }

    static drawHealth(context: CanvasRenderingContext2D, playerUnit: PlayerUnit): void {
        context.save();
        context.beginPath();
        context.fillStyle = HEALTH_FILL_STYLE;
        context.strokeStyle = HEALTH_STROKE_STYLE;
        const healthWidth = HUNDRED_HEALTH_WIDTH / 100 * playerUnit.maxHealth;
        const healthX = playerUnit.centerX - healthWidth / 2;
        const healthY = playerUnit.y + HEALTH_OFFSET_TOP;
        context.fillRect(healthX, healthY, HUNDRED_HEALTH_WIDTH * playerUnit.health / 100, HEALTH_HEIGHT);
        context.strokeRect(healthX, healthY, healthWidth, HEALTH_HEIGHT);
        context.restore();
    }
}

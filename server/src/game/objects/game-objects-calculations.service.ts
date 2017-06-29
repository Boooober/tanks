import { BaseObject } from './classes/base-object.class';
import { PlayerUnit } from './classes/player-unit.class';
import { BulletObject } from './classes/bullet-object.class';
import GameEvents, { GameEventsService } from '../game-events.service';

export class GameObjectsCalculationsService {
    constructor(private GameEventsService: GameEventsService) {}

    calculateBullet(bullet: BulletObject): void {
        bullet.moveForward();
        bullet.updateCenter();

        if (bullet.x < 0 ||
            bullet.y < 0 ||
            bullet.x > 6666 ||
            bullet.y > 6666) {
            bullet.remove();
        }
    };

    calculatePlayer(playerUnit: PlayerUnit): void {
        if (playerUnit.moveLeft) {
            playerUnit.rotateLeft();
        }
        if (playerUnit.moveRight) {
            playerUnit.rotateRight();
        }
        if (playerUnit.moveUp && playerUnit.canMoveForward()) {
            playerUnit.moveForward();
        }
        if (playerUnit.moveDown && playerUnit.canMoveBackward()) {
            playerUnit.moveBackward();
        }
        playerUnit.updateCenter();
    }

    attack(playerUnit: PlayerUnit): BulletObject {
        this.GameEventsService.emit('shooting', playerUnit);
        const bulletOptions = playerUnit.doAttack();
        return new BulletObject(bulletOptions);
    }

    calculateBulletCollisions(bullet: BulletObject, objects: BaseObject[]): void {
        objects.forEach(object => {
            if (object !== bullet && object !== bullet.shooter) {
                if (bullet.isCollidedWith(object)) {
                    this.calculateBulletDamage(bullet, object);
                    this.calculateObjectDamageFromBullet(bullet, object);
                    this.GameEventsService.emit('bulletCollision', bullet, object);

                    if (object.type === PlayerUnit.TYPE) {
                        this.GameEventsService.emit('bulletPlayerCollision', bullet, object as PlayerUnit);

                        if (object.health <= 0) {
                            this.GameEventsService.emit('bulletLethalCollision', bullet, object as PlayerUnit);
                        }
                    }
                }
            }
        });
    }

    calculatePlayerCollisions(playerUnit: PlayerUnit, objects: BaseObject[]): void {}

    private calculateBulletDamage(bullet: BulletObject, object: BaseObject): void {
        object.hit(bullet.power);
        bullet.remove();
    }

    private calculateObjectDamageFromBullet(bullet: BulletObject, object: BaseObject): void {
        if (object.health <= 0) {
            object.remove();
        }
    }
}

export default new GameObjectsCalculationsService(GameEvents);

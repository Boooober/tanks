import { Injectable } from 'injection-js';
import {
    BaseObject,
    PlayerUnit,
    BulletObject,
    GameEventsService
} from '../';


@Injectable()
export class GameObjectsCalculationsService {
    constructor(private gameEventsService: GameEventsService) {}

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
        this.gameEventsService.emit('shooting', playerUnit);
        const bulletOptions = playerUnit.doAttack();
        return new BulletObject(bulletOptions);
    }

    calculateBulletCollisions(bullet: BulletObject, objects: BaseObject[]): void {
        objects.forEach(object => {
            if (object !== bullet && object !== bullet.shooter) {
                if (bullet.isCollidedWith(object)) {
                    this.calculateBulletDamage(bullet, object);
                    this.calculateObjectDamageFromBullet(bullet, object);
                    this.gameEventsService.emit('bulletCollision', bullet, object);

                    if (object.type === PlayerUnit.TYPE) {
                        this.gameEventsService.emit('bulletPlayerCollision', bullet, object as PlayerUnit);

                        if (object.health <= 0) {
                            this.gameEventsService.emit('bulletLethalCollision', bullet, object as PlayerUnit);
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

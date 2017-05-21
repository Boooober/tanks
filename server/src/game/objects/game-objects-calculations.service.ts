import { BaseObject } from './classes/base-object.class';
import { MovingObject } from './classes/moving-object.class';
import { PlayerObject } from './classes/player-object.class';
import { BulletObject } from './classes/bullet-object.class';

class GameObjectsCalculationsService {
    calculateBullet(object: BulletObject): void {
        this.moveForward(object);
        if (object.x < 0 ||
            object.y < 0 ||
            object.x > 6666 ||
            object.y > 6666) {
            object.remove = true;
        }
        this.updateCenter(object);
    };

    calculatePlayer(object: PlayerObject): void {
        if (object.moveLeft) {
            object.deg -= object.rotateSpeed;
        }
        if (object.moveRight) {
            object.deg += object.rotateSpeed;
        }
        if (object.deg < 0) {
            object.deg = 360;
        }
        if (object.deg > 360) {
            object.deg = 0;
        }
        if (this.canMoveForward(object)) {
            this.moveForward(object);
        }
        if (this.canMoveBackward(object)) {
            this.moveBackward(object);
        }
        this.updateCenter(object);
    }

    isPlayerFiring(player: PlayerObject): boolean {
        return player.doFire && player.canFire && !player.fireWait;
    }

    doPlayerFire(player: PlayerObject): BulletObject {
        player.stats.totalShoots += 1;
        player.fireWait = true;
        setTimeout(() => {
            player.fireWait = false;
        }, player.fireDelay);
        return new BulletObject({
            x: player.x + (player.width / 2),
            y: player.y + (player.height / 2),
            deg: player.deg,
            speed: player.fireSpeed,
            shooter: player
        });
    }

    calculateBulletCollisions(bullet: BulletObject, objects: BaseObject[]): void {
        objects.forEach(object => {
            if (object !== bullet && object !== bullet.shooter) {
                if (this.hasCollision(bullet, object)) {
                    this.calculateBulletDamage(bullet, object);
                    this.calculateObjectDamageFromBullet(bullet, object);
                }
            }
        });
    }

    calculatePlayerCollisions(player: PlayerObject, objects: BaseObject[]): void {}

    private hasCollision(object1: BaseObject, object2: BaseObject): boolean {
        return object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y;
    }

    private calculateBulletDamage(bullet: BulletObject, object: BaseObject) {
        object.health -= bullet.power;
        bullet.shooter.stats.totalDamage = bullet.power;
        bullet.shooter.stats.successShoots += 1;
        bullet.remove = true;
    }

    private calculateObjectDamageFromBullet(bullet: BulletObject, object: BaseObject) {
        if (object.health <= 0) {
            object.remove = true;
        }
        if (object.type === PlayerObject.TYPE) {
            bullet.shooter.stats.receivedDamage += bullet.power;
            if (object.health <= 0) {
                bullet.shooter.stats.score += 1;
            }
        }
    }

    private updateCenter(object: BaseObject): void {
        object.centerX = object.x + object.width / 2;
        object.centerY = object.y + object.height / 2;
    }

    private canMoveForward(object: PlayerObject): boolean {
        if (object.moveUp) {
            return true;
        }
        return false;
    }
    private canMoveBackward(object: PlayerObject): boolean {
        if (object.moveDown) {
            return true;
        }
        return false;
    }

    private moveForward(object: MovingObject): void {
        object.x += object.speed * Math.sin(object.deg * (Math.PI / 180));
        object.y -= object.speed * Math.cos(object.deg * (Math.PI / 180));
    }

    private moveBackward(object: MovingObject): void {
        object.x -= object.speed * Math.sin(object.deg * (Math.PI / 180));
        object.y += object.speed * Math.cos(object.deg * (Math.PI / 180));
    }
}

export default new GameObjectsCalculationsService;

import { BaseObject } from './classes/base-object.class';
import { PlayerUnit } from './classes/player-unit.class';
import { MovingObject } from './classes/moving-object.class';
import { BulletObject } from './classes/bullet-object.class';
import GameEvents, { GameEventsService } from '../game-events.service';

export class GameObjectsCalculationsService {
    private actions: { [action: string]: Array<Function> };

    constructor(private GameEventsService: GameEventsService) {
    }

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

    calculatePlayer(object: PlayerUnit): void {
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

    attack(player: PlayerUnit): BulletObject {
        this.GameEventsService.emit('shooting', player);
        player.canAttack = false;
        player.isAttacking = true;
        setTimeout(() => {
            player.canAttack = true;
            player.isAttacking = false;
        }, 1000 / player.attackSpeed);

        return new BulletObject({
            x: player.x + (player.width / 2),
            y: player.y + (player.height / 2),
            deg: player.deg,
            power: player.attackPower,
            shooter: player
        });
    }

    calculateBulletCollisions(bullet: BulletObject, objects: BaseObject[]): void {
        objects.forEach(object => {
            if (object !== bullet && object !== bullet.shooter) {
                if (this.hasCollision(bullet, object)) {
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

    calculatePlayerCollisions(player: PlayerUnit, objects: BaseObject[]): void {}

    getRandomPosition(): { x: number, y: number, deg: number } {
        return {
            x: Math.floor(Math.random() * 1000),
            y: Math.floor(Math.random() * 700),
            deg: Math.floor(Math.random() * 360)
        };
    }

    private hasCollision(object1: BaseObject, object2: BaseObject): boolean {
        return object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y;
    }

    private calculateBulletDamage(bullet: BulletObject, object: BaseObject): void {
        object.health -= bullet.power;
        bullet.remove = true;
    }

    private calculateObjectDamageFromBullet(bullet: BulletObject, object: BaseObject): void {
        if (object.health <= 0) {
            object.remove = true;
        }
    }

    private updateCenter(object: BaseObject): void {
        object.centerX = object.x + object.width / 2;
        object.centerY = object.y + object.height / 2;
    }

    private canMoveForward(object: PlayerUnit): boolean {
        if (object.moveUp) {
            return true;
        }
        return false;
    }
    private canMoveBackward(object: PlayerUnit): boolean {
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

export default new GameObjectsCalculationsService(GameEvents);

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
            bullet.remove = true;
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

    getRandomPosition(): { x: number, y: number, deg: number } {
        return {
            x: Math.floor(Math.random() * 1000),
            y: Math.floor(Math.random() * 700),
            deg: Math.floor(Math.random() * 360)
        };
    }

    updateUnitScale(playerUnit: PlayerUnit, newScale: number): void {
        const [currentScale, previousScale] = playerUnit.scale;
        console.log('Updating unit scales: previous - %d, current - %d', previousScale, currentScale);
        playerUnit.scale = [newScale, currentScale];
    }

    scaleUnitProperties(playerUnit: PlayerUnit): void {
        const [currentScale, previousScale] = playerUnit.scale;
        if (currentScale === previousScale) { return; }

        console.log('Using unit scales: previous - %d, current - %d', previousScale, currentScale);

        const scale = currentScale / previousScale;
        this.updateUnitScale(playerUnit, currentScale);

        playerUnit.width = this.roundToDecimal(playerUnit.width * scale);
        playerUnit.height = this.roundToDecimal(playerUnit.height * scale);
        playerUnit.health = this.roundToDecimal(playerUnit.health * scale);
        playerUnit.maxHealth = this.roundToDecimal(playerUnit.maxHealth * scale);
        playerUnit.speed = this.roundToDecimal(playerUnit.speed / scale);
        playerUnit.rotateSpeed = this.roundToDecimal(playerUnit.rotateSpeed / scale);
        playerUnit.attackSpeed = this.roundToDecimal(playerUnit.attackSpeed / scale);
        playerUnit.attackPower = this.roundToDecimal(playerUnit.attackPower * scale);
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

    private roundToDecimal(number: number, decimal: number = 2): number {
        const digit = Number(`1e${decimal}`);
        return Math.round(number * digit) / digit;
    }
}

export default new GameObjectsCalculationsService(GameEvents);

import { Injectable } from 'injection-js';
import {
    BaseObject,
    PlayerUnit,
    BulletObject
    // CalculationEventType
} from '../entity';

// export interface ICalculationEvent {
//     type: CalculationEventType;
//     payload: any;
// }

@Injectable()
export class GameObjectsCalculationsService {

    // private events$: Subject<ICalculationEvent> = new Subject();

    // $getEvents(): Observable<ICalculationEvent> {
    //     return this.events$.asObservable();
    // }

    calculateBullet(bullet: BulletObject): void {
        bullet.moveForward();
        bullet.updateCenter();

        if (bullet.x < 0 ||
            bullet.y < 0 ||
            bullet.x > 6666 ||
            bullet.y > 6666) {
            bullet.remove();
        }
    }

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

    // attack(unit: PlayerUnit): BulletObject {
    //     this.emit(CalculationEventType.SHOOTING, { unit });
    //     return PlayerUnit.attack(unit);
    // }

    calculateBulletCollisions(bullet: BulletObject, objects: BaseObject[]): void {
        objects.forEach((object: BaseObject) => {
            if (object !== bullet && object !== bullet.shooter) {
                if (bullet.isCollidedWith(object)) {
                    this.calculateBulletDamage(bullet, object);
                    this.calculateObjectDamageFromBullet(bullet, object);
                    // this.emit(CalculationEventType.BULLET_COLLISION, { bullet, target: object });

                    if (object.type === PlayerUnit.TYPE) {
                        // this.emit(CalculationEventType.BULLET_PLAYER_COLLISION, { bullet, target: object });

                        if (object.health <= 0) {
                            // this.emit(CalculationEventType.BULLET_LETHAL_COLLISION, { bullet, target: object });
                        }
                    }
                }
            }
        });
    }

    calculatePlayerCollisions(playerUnit: PlayerUnit, objects: BaseObject[]): void {}

    // private emit(type: CalculationEventType, payload: any): void {
    //     this.events$.next({ type, payload });
    // }

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

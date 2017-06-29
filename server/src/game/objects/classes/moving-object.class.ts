import { BaseObject } from './base-object.class';

export class MovingObject extends BaseObject {
    public speed: number;
    public rotateSpeed: number;

    rotateLeft(): void {
        this.deg -= this.getRotateSpeed();
        if (this.deg < 0) {
            this.deg += 360;
        }
    }

    rotateRight(): void {
        this.deg += this.getRotateSpeed();
        if (this.deg > 360) {
            this.deg -= 360;
        }
    }

    moveForward(): void {
        this.x += this.getMovementSpeed() * Math.sin(this.deg * (Math.PI / 180));
        this.y -= this.getMovementSpeed() * Math.cos(this.deg * (Math.PI / 180));
    }

    moveBackward(): void {
        this.x -= this.getMovementSpeed() * Math.sin(this.deg * (Math.PI / 180));
        this.y += this.getMovementSpeed() * Math.cos(this.deg * (Math.PI / 180));
    }

    canMoveForward(): boolean {
        /** TODO area restrictions */
        return true;
    }

    canMoveBackward(): boolean {
        /** TODO area restrictions */
        return true;
    }

    getRotateSpeed(): number {
        return this.rotateSpeed;
    }

    getMovementSpeed(): number {
        return this.speed;
    }
}

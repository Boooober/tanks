import { BaseObject } from './base-object.class';

export class MovingObject extends BaseObject {
    public speed: number;
    public rotateSpeed: number;

    rotateLeft(): void {
        this.deg -= this.rotateSpeed;
        if (this.deg < 0) {
            this.deg += 360;
        }
    }

    rotateRight(): void {
        this.deg += this.rotateSpeed;
        if (this.deg > 360) {
            this.deg -= 360;
        }
    }

    moveForward(): void {
        this.x += this.speed * Math.sin(this.deg * (Math.PI / 180));
        this.y -= this.speed * Math.cos(this.deg * (Math.PI / 180));
    }

    moveBackward(): void {
        this.x -= this.speed * Math.sin(this.deg * (Math.PI / 180));
        this.y += this.speed * Math.cos(this.deg * (Math.PI / 180));
    }

    canMoveForward(): boolean {
        /** TODO area restrictions */
        return true;
    }

    canMoveBackward(): boolean {
        /** TODO area restrictions */
        return true;
    }
}

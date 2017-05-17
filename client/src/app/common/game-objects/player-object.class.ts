import { Playground } from './playground.class';
import { GameObjectAbstract } from './game-object-abstract.class';
import { GameObjectProperties } from './game-object-properties.class';

export const DEFAULT_PLAYER_OPTIONS = {
    deg: 45,
    speed: 2,
    width: 32,
    height: 48,
    health: 100,
    doFire: false,
    canFire: true,
    fireWait: false,
    fireDelay: 500,
    fireSpeed: 10,
    rotateSpeed: 3
};

export class PlayerObject extends GameObjectAbstract {
    public health: number;
    public rotateSpeed: number;

    public doFire: boolean;
    public canFire: boolean;
    public fireWait: boolean;
    public fireDelay: number;
    public fireSpeed: number;
    public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

    public moveUp: boolean;
    public moveDown: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;

    constructor(options?: GameObjectProperties) {
        super();
        Object.assign(this, DEFAULT_PLAYER_OPTIONS, options);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.deg * Math.PI / 180);

        const img = this.fireWait ? this.fireImage : this.image;
        context.drawImage(img, -this.width / 2, -this.height / 2);
    };

    update(playground: Playground): void {
        if (this.moveLeft) {
            this.deg -= this.rotateSpeed;
        }
        if (this.moveRight) {
            this.deg += this.rotateSpeed;
        }
        if (this.deg < 0) {
            this.deg = 360;
        }
        if (this.deg > 360) {
            this.deg = 0;
        }

        if (this.moveUp) {
            this.x += this.speed * Math.sin(this.deg * (Math.PI / 180));
            this.y -= this.speed * Math.cos(this.deg * (Math.PI / 180));
        }

        if (this.moveDown) {
            this.x -= this.speed * Math.sin(this.deg * (Math.PI / 180));
            this.y += this.speed * Math.cos(this.deg * (Math.PI / 180));
        }
    };

    isFiring(): boolean {
        return this.doFire && this.canFire && !this.fireWait;
    }

    fire(): void {
        this.fireWait = true;
        setTimeout(() => {
            this.fireWait = false;
        }, this.fireDelay);
    }
}

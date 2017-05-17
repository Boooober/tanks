import { Playground } from './playground.class';
import { GameObjectAbstract } from './game-object-abstract.class';
import { GameObjectProperties } from './game-object-properties.class';

export const DEFAULT_BULLET_OPTIONS = {
    speed: 5,
    width: 2,
    height: 10
};

export class BulletObject extends GameObjectAbstract {
    constructor(options: GameObjectProperties) {
        super();
        Object.assign(this, DEFAULT_BULLET_OPTIONS, options);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.deg * Math.PI / 180);
        context.fillStyle = 'rgb(255,200,0)';
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        // context.drawImage(this.image, -this.width / 2, -this.height / 2);
    };

    update(playground: Playground): void {
        // this.moveForward();

        if (this.x < 0 ||
            this.y < 0 ||
            this.x > playground.width ||
            this.y > playground.height) {
            this.remove = true;
        }
    };
}

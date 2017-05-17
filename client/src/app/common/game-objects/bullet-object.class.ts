import { Playground } from './playground.class';
import { GameObjectAbstract } from './game-object-abstract.class';
import { GameObjectProperties } from './game-object-properties.class';

export const DEFAULT_BULLET_OPTIONS = {
    speed: 5,
    width: 10,
    height: 2
};

export class BulletObject extends GameObjectAbstract {
    constructor(options: GameObjectProperties) {
        super();
        Object.assign(this, DEFAULT_BULLET_OPTIONS, options);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.deg * Math.PI / 180);
        context.drawImage(this.image, -this.width / 2, -this.height / 2);
    };

    update(playground: Playground): void {
        this.x += this.speed * Math.sin(this.deg * (Math.PI / 180));
        this.y -= this.speed * Math.cos(this.deg * (Math.PI / 180));

        if (this.x < 0 ||
            this.y < 0 ||
            this.x > playground.width ||
            this.y > playground.height) {
            this.remove = true;
        }
    };
}

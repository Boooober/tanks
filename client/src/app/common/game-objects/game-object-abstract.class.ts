import { Playground } from './playground.class';
import { GameObjectProperties } from './game-object-properties.class';

export abstract class GameObjectAbstract extends GameObjectProperties {
    abstract draw(context: CanvasRenderingContext2D): void;

    abstract update(playground: Playground): void;

    moveForward() {
        this.x += this.speed * Math.sin(this.deg * (Math.PI / 180));
        this.y -= this.speed * Math.cos(this.deg * (Math.PI / 180));
    }

    moveBackward() {
        this.x -= this.speed * Math.sin(this.deg * (Math.PI / 180));
        this.y += this.speed * Math.cos(this.deg * (Math.PI / 180));
    }
}

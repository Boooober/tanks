import { Playground } from './playground.class';
import { GameObjectProperties } from './game-object-properties.class';

export abstract class GameObjectAbstract extends GameObjectProperties {
    abstract draw(context: CanvasRenderingContext2D): void;

    abstract update(playground: Playground): void;
}

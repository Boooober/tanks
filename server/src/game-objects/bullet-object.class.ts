import { GameObjectProperties } from './game-object-properties.class';

export class BulletObject extends GameObjectProperties {
  constructor(options) {
    super();
    Object.assign(this, options);
  }
}

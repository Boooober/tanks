import { GameObjectProperties } from './game-object-properties.class';

export const DEFAULT_BULLET_OPTIONS = {
  speed: 5,
  width: 2,
  height: 10,
  type: 'bullet'
};

export class BulletObject extends GameObjectProperties {
  constructor(options?: any) {
    super();
    Object.assign(this, DEFAULT_BULLET_OPTIONS, options);
  }
}

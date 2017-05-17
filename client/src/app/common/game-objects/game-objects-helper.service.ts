import { Playground } from './playground.class';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GameObjectAbstract } from './game-object-abstract.class';

export class GameObjectsHelperService {
    static createPlayer(): PlayerObject {
        return new PlayerObject();
    }

    static playerFire(player: PlayerObject): BulletObject {
        player.fire();
        return new BulletObject({
            x: player.x + (player.width / 2),
            y: player.y + (player.height / 2),
            deg: player.deg,
            speed: player.fireSpeed
        });
    }
}

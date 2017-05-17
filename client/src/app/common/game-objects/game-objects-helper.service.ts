import { Playground } from './playground.class';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GameObjectAbstract } from './game-object-abstract.class';

export const ACTION_KEYS = {
    37: 'moveLeft',
    65: 'moveLeft',
    39: 'moveRight',
    68: 'moveRight',
    38: 'moveUp',
    87: 'moveUp',
    40: 'moveDown',
    83: 'moveDown',
    32: 'doFire',
    13: 'doFire'
};

export class GameObjectsHelperService {
    static createPlayer(options): PlayerObject {
        return new PlayerObject(options);
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

    static startAction(player: PlayerObject, event: KeyboardEvent) {
        console.log('start');
        player[GameObjectsHelperService.getAction(event)] = true;
    }

    static finishAction(player: PlayerObject, event: KeyboardEvent) {
        console.log('finish');
        player[GameObjectsHelperService.getAction(event)] = false;
    }

    private static getAction(event: KeyboardEvent): string {
        const { keyCode } = event;
        console.log(ACTION_KEYS[keyCode]);
        return ACTION_KEYS[keyCode];
    }
}

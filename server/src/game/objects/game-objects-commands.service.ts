import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';

import GameObjectsCalculationsService from './game-objects-calculations.service';

class GameObjectsCommandsService {
    doFire(player: PlayerObject, value: boolean): BulletObject | null {
        player.doFire = value;
        return GameObjectsCalculationsService.isPlayerFiring(player)
            ? GameObjectsCalculationsService.doPlayerFire(player)
            : null;
    }

    moveUp(player: PlayerObject, value: boolean): void {
        player.moveUp = value;
    }

    moveLeft(player: PlayerObject, value: boolean): void {
        player.moveLeft = value;
    }

    moveRight(player: PlayerObject, value: boolean): void {
        player.moveRight = value;
    }

    moveDown(player: PlayerObject, value: boolean): void {
        player.moveDown = value;
    }
}

export default new GameObjectsCommandsService;

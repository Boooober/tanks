import { GamePlayer } from '../game-player.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';
import GameObjectsService from './game-objects.service';
import GameObjectsCalculationsService from './game-objects-calculations.service';

export const ACTIONS_MAP = {
    37: 'moveLeft',
    65: 'moveLeft',
    39: 'moveRight',
    68: 'moveRight',
    38: 'moveUp',
    87: 'moveUp',
    40: 'moveDown',
    83: 'moveDown',
    32: 'doFire',
    13: 'doFire',
    82: 'restart'
};

class GamePlayersObjectService {
    create(sessionId: string, user: GamePlayer): void {
        GameObjectsService.createPlayer(sessionId, user);
    }

    remove(sessionId: string): void {
        GameObjectsService.removePlayer(sessionId);
    }

    get(sessionId: string): PlayerObject | null {
        return GameObjectsService.getPlayer(sessionId);
    }

    executeAction(sessionId: string, player: GamePlayer, data: { action: number, value: any }): void {
        const playerObject = GameObjectsService.getPlayer(sessionId);
        const { action, value } = data;

        if (!playerObject) {
            switch (action) {
                // Restart
                case 82:
                    this.restart(sessionId, player);
                    break;
            }
        } else {
            switch (action) {
                // Do fire
                case 13:
                case 32:
                    const bullet = this.doFire(playerObject, value);
                    if (bullet) { GameObjectsService.addObject(bullet); }
                    break;

                // Move up
                case 38:
                case 87:
                    this.moveUp(playerObject, value);
                    break;

                // Move left
                case 37:
                case 65:
                    this.moveLeft(playerObject, value);
                    break;

                // Move right
                case 39:
                case 68:
                    this.moveRight(playerObject, value);
                    break;

                // Move down
                case 40:
                case 83:
                    this.moveDown(playerObject, value);
                    break;
            }
        }
    }

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

    restart(sessionId: string, player: GamePlayer) {
        GameObjectsService.createPlayer(sessionId, player);
    }
}

export default new GamePlayersObjectService;

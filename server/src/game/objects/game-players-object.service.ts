import { GameUser } from '../game-user.class';
import GameObjectsService from './game-objects.service';
import GameObjectsCommandsService from './game-objects-commands.service';

class GamePlayersObjectService {
    create(sessionId: string, user: GameUser): void {
        GameObjectsService.createPlayer(sessionId, user);
    }

    remove(sessionId: string): void {
        GameObjectsService.removePlayer(sessionId);
    }

    executeAction(sessionId: string, data: { action: string, value: any }): void {
        const player = GameObjectsService.getPlayer(sessionId);

        if (!player) { return; }

        const { action, value } = data;
        switch (action) {
            case 'doFire':
                const bullet = GameObjectsCommandsService.doFire(player, value);
                if (bullet) { GameObjectsService.addObject(bullet); }
                break;
            case 'moveUp':
                GameObjectsCommandsService.moveUp(player, value);
                break;
            case 'moveLeft':
                GameObjectsCommandsService.moveLeft(player, value);
                break;
            case 'moveRight':
                GameObjectsCommandsService.moveRight(player, value);
                break;
            case 'moveDown':
                GameObjectsCommandsService.moveDown(player, value);
                break;
        }
    }
}

export default new GamePlayersObjectService;

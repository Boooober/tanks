import GameObjectsService from '../game/objects/game-objects.service';
import UserSessionsService from '../game/connection/user-sessions.service';

/**
 * @name GameLoop
 */
export default function setupGameLoop() {
    setInterval(() => {
        GameObjectsService.update();
        UserSessionsService.sendAllMessage('objectUpdates', GameObjectsService.objects);
    }, 1000 / 50);
}

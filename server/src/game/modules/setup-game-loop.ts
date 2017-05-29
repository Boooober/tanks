import GameObjectsService from '../objects/game-objects.service';
import UserSessionsService from '../connection/user-sessions.service';

/**
 * @name GameLoop
 */
export default function setupGameLoop() {
    setInterval(() => {
        GameObjectsService.update();
        UserSessionsService.sendAllMessage('objectUpdates', GameObjectsService.objects);
    }, 1000 / 50);
}

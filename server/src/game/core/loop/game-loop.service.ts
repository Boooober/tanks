import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';

import { SocketConnection } from '../../../core/socket/socket-connection';
import { GameObjectsService } from '../player/game-objects.service';
import { SocketCommand } from '../../../../../common/socket-command.enum';

@Injectable()
export class GameLoopService {

    static FPS: number = 1000 / 50;

    constructor(
        private socketConnection: SocketConnection,
        private gameObjectsService: GameObjectsService
    ) {}

    create(): any {
        return setInterval(() => this.tick(), GameLoopService.FPS);
    }

    terminate(loop: Timer): void {
        this.gameObjectsService.clear();
        clearInterval(loop);
        this.tick();
    }

    private tick(): void {
        this.gameObjectsService.update();
        this.socketConnection.sendAll({
            action: SocketCommand.OBJECT_UPDATES,
            payload: this.gameObjectsService.getDto()
        });
    }
}

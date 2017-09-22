import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';
import {
    GameObjectsService,
    GameSessionsService
} from 'Core';


@Injectable()
export class GameLoopService {
    static FPS = 1000 / 50;

    constructor(private gameObjectsService: GameObjectsService,
                private gameSessionsService: GameSessionsService) {
    }

    create(): Timer {
        return setInterval(() => this.tick(), GameLoopService.FPS);
    }

    terminate(loop: Timer) {
        this.gameObjectsService.clear();
        clearInterval(loop);
        this.tick();
    }

    private tick(): void {
        this.gameObjectsService.update();
        this.gameSessionsService.sendAllMessage('objectUpdates', this.gameObjectsService.getDto());
    }
}

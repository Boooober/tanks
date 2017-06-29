import Timer = NodeJS.Timer;
import GameObjects, { GameObjectsService } from './objects/game-objects.service';
import GameSessions, { GameSessionsService } from './game-sessions.service';

export class GameLoopService {
    static FPS = 1000 / 50;

    constructor(private GameObjectsService: GameObjectsService,
                private GameSessionsService: GameSessionsService) {
    }

    create(): Timer {
        return setInterval(() => this.tick(), GameLoopService.FPS);
    }

    terminate(loop: Timer) {
        this.GameObjectsService.clear();
        clearInterval(loop);
        this.tick();
    }

    private tick(): void {
        this.GameObjectsService.update();
        this.GameSessionsService.sendAllMessage('objectUpdates', this.GameObjectsService.getDto());
    }
}

export default new GameLoopService(GameObjects, GameSessions);

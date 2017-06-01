import { TYPE } from './the-game.constant';
import { IGameStrategy } from './game-strategy.interface';

import setupGameEndpoints from './endpoints/setup-game-endpoints';

import Rounds, { RoundsStrategy } from './modules/game-types/rounds/rounds.strategy';
import Deathmatch, { DeathmatchStrategy } from './modules/game-types/deathmatch/deathmatch.strategy';
import Log, { LogService } from './log.service';
import GameLoop, { GameLoopService } from './game-loop.service';
import GameEvents, { GameEventsService } from './game-events.service';
import GameModules, { GameModulesService } from './game-modules.service';
import GameActions, { GameActionsService } from './game-actions.service';
import GameSessions, { GameSessionsService } from './game-sessions.service';

export class TheGame {
    private strategy: IGameStrategy | null = null;
    private strategyConfig: Object = {};

    constructor(private RoundsStrategy: RoundsStrategy,
                private DeathmatchStrategy: DeathmatchStrategy,
                private LogService: LogService,
                private GameLoopService: GameLoopService,
                private GameEventsService: GameEventsService,
                private GameModulesService: GameModulesService,
                private GameActionsService: GameActionsService,
                private GameSessionsService: GameSessionsService) {
    }

    init(app) {
        setupGameEndpoints(app);
        this.GameModulesService.init(app);

        if (this.isGameTypeActive(TYPE.ROUNDS)) {
            console.log('Setup rounds strategy');
            this.setStrategy(this.RoundsStrategy, TYPE.ROUNDS.config);
        } else if (this.isGameTypeActive(TYPE.DEATHMATCH)) {
            console.log('Setup deathmatch strategy');
            this.setStrategy(this.DeathmatchStrategy, TYPE.ROUNDS.config);
        }
        this.start();
    }

    setStrategy(strategy: IGameStrategy, config: Object = {}) {
        this.strategy = strategy;
        this.strategyConfig = config;
    }

    start(): void {
        if (this.strategy) {
            this.strategy.start(this.strategyConfig);
        }
    }

    terminate(): void {
        if (this.strategy) {
            this.strategy.terminate();
        }
    }

    private isGameTypeActive(gameType) {
        return gameType && gameType.active || gameType === true;
    }
}

export default new TheGame(
    Rounds,
    Deathmatch,
    Log,
    GameLoop,
    GameEvents,
    GameModules,
    GameActions,
    GameSessions
);

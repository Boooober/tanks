import { Injectable } from 'injection-js';
import {
    RoundsStrategy,
    DeathmatchStrategy,
    DeathSalvationMode
} from 'Core';

import { CONFIG, TYPES, MODES } from './config/game.config';
import { IGameType } from './core/game-types/game-type.interface';


@Injectable()
export class GameConfigService {
    private strategy: IGameType | null = null;
    private strategyConfig: Object = {};

    private modesList = {};
    private strategiesList = {};

    constructor(private roundsStrategy: RoundsStrategy,
                private deathmatchStrategy: DeathmatchStrategy,
                private deathSalvationMode: DeathSalvationMode) {
        /** Setup modes patch */
        this.modesList[MODES.DEATH_SALVATION] = deathSalvationMode;

        /** Setup game-type strategy */
        this.strategiesList[TYPES.ROUNDS] = roundsStrategy;
        this.strategiesList[TYPES.DEATHMATCH] = deathmatchStrategy;
    }

    init() {
        this.setStrategy(
            this.strategiesList[CONFIG.gameType.strategy],
            CONFIG.gameType.config
        );
        CONFIG.modes.forEach(mode => this.modesList[mode].init());
        this.start();
    }

    setStrategy(strategy: IGameType, config: Object = {}) {
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
}

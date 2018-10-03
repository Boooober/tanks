import { Injectable } from 'injection-js';

import { CONFIG, TYPES, MODES } from './config/game.config';
import { IGameType } from './game-types/game-type.interface';
import { DeathmatchStrategy, RoundsStrategy } from './game-types';
import { DeathSalvationMode } from './modes';

@Injectable()
export class GameConfigService {
    private strategy: IGameType | null = null;
    private strategyConfig: any = {};

    private modesList: any = {};
    private strategiesList: any = {};

    constructor(
        roundsStrategy: RoundsStrategy,
        deathmatchStrategy: DeathmatchStrategy,
        deathSalvationMode: DeathSalvationMode
    ) {
        /** Setup modes patch */
        this.modesList[MODES.DEATH_SALVATION] = deathSalvationMode;

        /** Setup game-type strategy */
        this.strategiesList[TYPES.ROUNDS] = roundsStrategy;
        this.strategiesList[TYPES.DEATHMATCH] = deathmatchStrategy;
    }

    init(): void {
        this.setStrategy(
            this.strategiesList[CONFIG.gameType.strategy],
            CONFIG.gameType.config
        );
        CONFIG.modes.forEach(mode => this.modesList[mode].init());
        this.start();
    }

    setStrategy(strategy: IGameType, config: object = {}): void {
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

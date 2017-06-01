const Q = require('q');
import Timer = NodeJS.Timer;

import Rounds, { RoundsService } from './rounds.service';
import { IGameStrategy } from '../../../game-strategy.interface';

// TODO refactor to async/await?
export class RoundsStrategy implements IGameStrategy {
    public roundDuration: number = 2 * 60 * 1000;
    public breakDuration: number = 0.5 * 60 * 1000;

    private roundDeferred: Q.Deferred<any> = Q.defer();

    constructor(private RoundsService: RoundsService) {}

    start(config): void {
        this.roundDuration = config.roundDuration;
        this.breakDuration = config.breakDuration;

        this.RoundsService.init();
        this.loopRounds();
    }

    terminate(): void {
        this.RoundsService.roundsTerminate();
        this.roundDeferred.reject(this.RoundsService.getStatus());
    }

    protected loopRounds(): void {
        this.roundDeferred.resolve();
        this.roundDeferred.promise
            .then(() => this.launchRound())
            .then(() => this.launchBreak())
            .then(() => this.loopRounds());
    }

    protected launchRound(): Q.Promise<any> {
        this.RoundsService.roundStart();
        this.roundDeferred = Q.defer();
        setTimeout(() => {
            this.RoundsService.roundEnd();
            this.roundDeferred.resolve();
        }, this.roundDuration);
        return this.roundDeferred.promise;
    }

    protected launchBreak(): Q.Promise<any> {
        this.RoundsService.breakStart();
        this.roundDeferred = Q.defer();
        setTimeout(() => {
            this.RoundsService.breakEnd();
            this.roundDeferred.resolve();
        }, this.breakDuration);
        return this.roundDeferred.promise;
    }
}

export default new RoundsStrategy(Rounds);

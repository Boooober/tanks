import * as Q from 'q';
import { Injectable } from 'injection-js';
import { RoundsService } from './rounds.service';
import { IGameType } from '../game-type.interface';


@Injectable()
export class RoundsStrategy implements IGameType {
    public roundDuration: number = 2 * 60 * 1000;
    public breakDuration: number = 0.5 * 60 * 1000;

    private roundDeferred: Q.Deferred<any> = Q.defer();

    constructor(private roundsService: RoundsService) {}

    start(config): void {
        this.roundDuration = config.roundDuration;
        this.breakDuration = config.breakDuration;

        this.roundsService.init();
        this.loopRounds();
    }

    terminate(): void {
        this.roundsService.roundsTerminate();
        this.roundDeferred.reject(this.roundsService.getStatus());
    }

    protected loopRounds(): void {
        this.roundDeferred.resolve();
        this.roundDeferred.promise
            .then(() => this.launchRound())
            .then(() => this.launchBreak())
            .then(() => this.loopRounds());
    }

    protected launchRound(): Q.Promise<any> {
        this.roundsService.roundStart();
        this.roundDeferred = Q.defer();
        setTimeout(() => {
            this.roundsService.roundEnd();
            this.roundDeferred.resolve();
        }, this.roundDuration);
        return this.roundDeferred.promise;
    }

    protected launchBreak(): Q.Promise<any> {
        this.roundsService.breakStart();
        this.roundDeferred = Q.defer();
        setTimeout(() => {
            this.roundsService.breakEnd();
            this.roundDeferred.resolve();
        }, this.breakDuration);
        return this.roundDeferred.promise;
    }
}

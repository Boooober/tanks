import { Injectable } from 'injection-js';
import { IGameType } from '../game-type.interface';
import { DeathmatchService } from './deathmatch.service';

@Injectable()
export class DeathmatchStrategy implements IGameType {

    constructor(
        private deathmatchService: DeathmatchService
    ) {}

    start(): void {
        this.deathmatchService.init();
        this.deathmatchService.start();
    }

    terminate(): void {
        this.deathmatchService.terminate();
    }
}

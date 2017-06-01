import Deathmatch, { DeathmatchService } from './deathmatch.service';
import { IGameStrategy } from '../../../game-strategy.interface';

export class DeathmatchStrategy implements IGameStrategy {
    constructor(private DeathmatchService: DeathmatchService) {}

    start(): void {
        this.DeathmatchService.init();
        this.DeathmatchService.start();
    }

    terminate(): void {
        this.DeathmatchService.terminate();
    }
}

export default new DeathmatchStrategy(Deathmatch);

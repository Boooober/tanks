import { Injectable } from 'injection-js';

import { GameConfigService } from './game-config';
import setupGameEndpoints from './endpoints/setup-game-endpoints';
import { SocketConnection } from '../core/socket/socket-connection';

@Injectable()
export class GameRunService {

    constructor(
        private socketConnection: SocketConnection,
        private gameConfigService: GameConfigService
    ) {}

    init(app: any): void {
        setupGameEndpoints(app);
        this.socketConnection.setup(app);
        this.gameConfigService.init();
    }
}

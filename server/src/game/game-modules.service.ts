const WS = require('ws');
const http = require('http');
import * as WebSocket from '@types/ws';

import { MODS } from './the-game.constant';
import DeathSalvation, { DeathSalvationMod } from './modules/features/death-salvation-mode';
import GameSessions, { GameSessionsService } from './game-sessions.service';
import GameStatistics, { GameStatisticsService } from './modules/statistics/game-statistics.service';

export class GameModulesService {
    constructor(private DeathSalvationMod: DeathSalvationMod,
                private GameSessionsService: GameSessionsService,
                private GameStatisticsService: GameStatisticsService) {
    }

    init(app) {
        this.setupSocketConnection(app);
        this.GameStatisticsService.init();

        if (MODS.DEATH_SALVATION) {
            this.DeathSalvationMod.init();
        }
    }

    private setupSocketConnection(app): void {
        const server = http.createServer(app);
        const wss = new WS.Server({ server, port: 8081 });

        wss.on('connection', (ws: WebSocket, req: any): void => {
            this.GameSessionsService.createSession(ws);
        });
    }
}

export default new GameModulesService(
    DeathSalvation,
    GameSessions,
    GameStatistics
);

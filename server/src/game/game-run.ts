const WS = require('ws');
const http = require('http');
import * as WebSocket from 'ws';
import { Injectable } from 'injection-js';
import { GameSessionsService } from './core';
import { GameStatisticsService } from './modules'

import { GameConfigService } from './game-config';
import setupGameEndpoints from './endpoints/setup-game-endpoints';


@Injectable()
export class GameRunService {
    constructor(private gameConfigService: GameConfigService,
                private gameSessionsService: GameSessionsService,
                private gameStatisticsService: GameStatisticsService) {
    }

    init(app) {
        setupGameEndpoints(app);
        this.gameConfigService.init();
        this.setupSocketConnection(app);
        this.gameStatisticsService.init();
    }

    private setupSocketConnection(app): void {
        const server = http.createServer(app);
        const wss = new WS.Server({ server, port: 8081 });

        wss.on('connection', (ws: WebSocket, req: any): void => {
            this.gameSessionsService.createSession(ws);
        });
    }
}

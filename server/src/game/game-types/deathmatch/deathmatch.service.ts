import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';

import { PlayerService } from '../../core/player/player/players.service';
import { GameLoopService } from '../../core/loop/game-loop.service';
import { SocketConnection } from '../../../core/socket/socket-connection';
import { GameObjectsService } from '../../core/player/game-objects.service';

import { DeathmatchStatisticsService } from './deathmatch-statistics.service';
import { Player } from '../../core/player/entity';
import { SocketCommand } from '../../../../../common/socket-command.enum';
import { ISocketSessionMessage } from '../../../core/socket/entity';

@Injectable()
export class DeathmatchService {

    static IN_PROGRESS: string = 'in progress';
    static TERMINATED: string = 'terminated';

    public status: string;
    private gameLoop: Timer;

    constructor(
        private playerService: PlayerService,
        private gameLoopService: GameLoopService,
        private socketConnection: SocketConnection,
        private gameObjectsService: GameObjectsService,
        private deathmatchStatisticsService: DeathmatchStatisticsService
    ) {}

    init(): void {
        this.deathmatchStatisticsService.init();
        this.deathmatchStatisticsService.clear();
    }

    start(): void {
        this.socketConnection.$onMessage(SocketCommand.USER).subscribe(
            ((message: ISocketSessionMessage) => this.playerService.add(message.sessionId, message.payload.id))
        );

        this.playerService.$getPlayer().subscribe(
            (player: Player) => this.gameObjectsService.add(player.unit)
        );
        this.gameLoop = this.gameLoopService.create();
        this.status = DeathmatchService.IN_PROGRESS;
    }

    terminate(): void {
        const payload = this.deathmatchStatisticsService.get();
        this.gameLoopService.terminate(this.gameLoop);
        this.status = DeathmatchService.TERMINATED;

        this.socketConnection.sendAll({ payload, action: SocketCommand.GAME_STATISTICS });
    }
}

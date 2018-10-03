import { Injectable } from 'injection-js';
import { Observable, Subject } from 'rxjs/index';
import { retry } from 'rxjs/internal/operators';

import { UserModel } from '../../../../database/database';

import { ISocketSessionMessage, SessionId } from '../../../../core/socket/entity';
import { SocketConnection } from '../../../../core/socket/socket-connection';
import { SocketCommand } from '../../../../../../common/socket-command.enum';

import { mapPlayerActionToUnit } from '../helpers';
import { UnitControlService } from '../unit/unit-control.service';
import { Player, PlayerUnit, PlayerStatistics, IPlayerAction } from '../entity';

@Injectable()
export class PlayerService {

    private players: Map<SessionId, Player> = new Map();
    private units: Map<SessionId, PlayerUnit> = new Map();

    private player$: Subject<Player> = new Subject();

    constructor(
        private socketConnection: SocketConnection,
        private unitControlService: UnitControlService
    ) {
        this.socketConnection
            .$onMessage(SocketCommand.UNIT_ACTION)
            .pipe(retry())
            .subscribe((message: ISocketSessionMessage) => this.executeUnitAction(message.sessionId, message.payload));

        this.socketConnection
            .$onDisconnect()
            .subscribe((sessionId: SessionId) => this.remove(sessionId));
    }

    async add(sessionId: SessionId, userId: string): Promise<void> {
        try {
            const user = await UserModel.findById(userId).lean();
            const player = new Player(
                sessionId,
                user.id,
                user.name,
                new PlayerUnit(
                    user.id,
                    sessionId,
                    user.name
                ),
                new PlayerStatistics(
                    user.name,
                    user.statistics.score,
                    user.statistics.totalShoots,
                    user.statistics.successShoots,
                    user.statistics.totalDamage,
                    user.statistics.receivedDamage
                )
            );
            this.players.set(sessionId, player);
            this.units.set(sessionId, player.unit);

            this.player$.next(player);
        } catch (error) {
            console.log('User finding or constructing error occurred');
            console.log(error);
        }
    }

    async remove(sessionId: SessionId): Promise<void> {
        const player = this.players.get(sessionId);
        const { id, unit } = player;
        await UserModel.saveObject(id, unit);

        this.players.delete(sessionId);
        unit.remove();
    }

    executeUnitAction(sessionId: SessionId, action: IPlayerAction): void {
        const { unit } = this.players.get(sessionId);
        this.unitControlService.executeAction(unit, mapPlayerActionToUnit(action));
    }

    $getPlayer(): Observable<Player> {
        return this.player$.asObservable();
    }

    getUnit(sessionId: SessionId): PlayerUnit {
        const player = this.players.get(sessionId);

        const { unit } = player;
        return unit;
    }

    getAllUnits(): PlayerUnit[] {
        return Array.from(this.units.values());
    }

    updateUnitInfo(sessionId: SessionId, data?: any /* TODO PlayerUnitDTO */): void {
        const unit = this.getUnit(sessionId);
        if (!unit) { return; }

        // TODO move logic to better place
        // if (data && data.hasOwnProperty('scale')) {
        //     console.log(unit);
        //     console.log(data.scale);
        //
        //     this.unitModifyService.updateModifier(unit, new ScaleModifier({ scale: data.scale }));
        // }

        // this.gameSessionsService.sendMessage(sessionId, 'unitUpdates', new PlayerUnitInfoDTO(unit));
    }
}

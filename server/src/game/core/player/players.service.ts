import { Injectable } from 'injection-js';
import {
    Player,
    PlayerUnit,
    GameEventsService,
    GameActionsService
} from '../';

import { GameSessionsService } from './game-sessions.service';
import { UnitControlService } from './unit-control.service';

import { UserModel } from '../../../database/database';
import { PlayerUnitInfoDTO } from '../objects/dto/player-unit-info.dto.class';


@Injectable()
export class PlayersService {
    private players: { [sessionId: string ]: Player } = {};

    constructor(private gameEventsService: GameEventsService,
                private gameActionsService: GameActionsService,
                private gameSessionsService: GameSessionsService,
                private unitControlService: UnitControlService) {
        /** @see GameSessionsService.deleteSession  */
        this.gameEventsService.on('deleteSession', sessionId => this.remove(sessionId));

        /** @see GameSessionsService.onMessage  */
        this.gameActionsService.on('user', (sessionId, { id }) => this.setup(sessionId, id));
        this.gameActionsService.on('unitAction', (sessionId, data) => this.executeAction(sessionId, data));
        this.gameActionsService.on('unitUpdates', (sessionId, data) => this.updateUnitInfo(sessionId, data));
    }

    get(): Player[];
    get(sessionId: string): Player | null;
    get(sessionId?: string) {
        return sessionId
            ? this.players[sessionId] || null
            : Object.keys(this.players).map(session => this.players[session]);
    }

    setup(sessionId: string, userId: string): void {
        UserModel.findById(userId, (error, user) => {
            const player = new Player(user, { sessionId });
            this.players[sessionId] = player;
            this.unitControlService.create(player);
        });
    }

    remove(sessionId: string): void {
        const player = this.players[sessionId];
        const { id, unit } = player;
        UserModel.saveObject(id, unit);
        delete this.players[sessionId];
        this.unitControlService.removeUnit(unit);
    }

    executeAction(sessionId: string, data: { action: number, value: any }): void {
        const player = this.players[sessionId];
        this.unitControlService.executeAction(player, data);
    }

    getUnitInfo(sessionId: string): PlayerUnit | null {
        const { unit = null } = this.get(sessionId) || {};
        return unit;
    }

    updateUnitInfo(sessionId: string, data?: any /* TODO PlayerUnitDTO */): void {
        const unit = this.getUnitInfo(sessionId);
        if (!unit) { return; }

        // TODO move logic to better place
        // if (data && data.hasOwnProperty('scale')) {
        //     console.log(unit);
        //     console.log(data.scale);
        //
        //     this.unitModifyService.updateModifier(unit, new ScaleModifier({ scale: data.scale }));
        // }

        this.gameSessionsService.sendMessage(sessionId, 'unitUpdates', new PlayerUnitInfoDTO(unit));
    }
}

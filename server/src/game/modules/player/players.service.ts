import { Player } from '../../classes/player.class';
import { PlayerUnit } from '../../objects/classes/player-unit.class';

import { UserModel } from '../../../database/database';
import GameEvents, { GameEventsService } from '../../game-events.service';
import GameAction, { GameActionsService } from '../../game-actions.service';
import GameSessions, { GameSessionsService } from '../../game-sessions.service';
import UnitManipulations, { UnitManipulationsService } from './unit-manipulations.service';
import { ScaleModifier } from '../../objects/modifiers/scale-modifier.class';
import { PlayerUnitInfoDTO } from '../../objects/dto/player-unit-info.dto.class';

export class PlayersService {
    private players: { [sessionId: string ]: Player } = {};

    constructor(private GameEventsService: GameEventsService,
                private GameActionsService: GameActionsService,
                private GameSessionsService: GameSessionsService,
                private UnitManipulationsService: UnitManipulationsService) {
        this.GameEventsService.on('deleteSession', sessionId => this.remove(sessionId));

        this.GameActionsService.on('user', (sessionId, { id }) => this.setupPlayer(sessionId, id));
        this.GameActionsService.on('unitAction', (sessionId, data) => this.executeAction(sessionId, data));
        this.GameActionsService.on('unitUpdates', (sessionId, data) => this.updateUnitInfo(sessionId, data));
    }

    get(): Player[];
    get(sessionId: string): Player | null;
    get(sessionId?: string) {
        return sessionId
            ? this.players[sessionId] || null
            : Object.keys(this.players).map(session => this.players[session]);
    }

    setupPlayer(sessionId: string, userId: string): void {
        UserModel.findById(userId, (error, user) => {
            const player = new Player(user, { sessionId });
            this.players[sessionId] = player;
            this.UnitManipulationsService.create(player);
        });
    }

    remove(sessionId: string): void {
        const player = this.players[sessionId];
        const { id, unit } = player;
        UserModel.saveObject(id, unit);
        delete this.players[sessionId];
        this.UnitManipulationsService.removeUnit(unit);
    }

    executeAction(sessionId: string, data: { action: number, value: any }): void {
        const player = this.players[sessionId];
        this.UnitManipulationsService.executeAction(player, data);
    }

    getUnitInfo(sessionId: string): PlayerUnit | null {
        const { unit = null } = this.get(sessionId) || {};
        return unit;
    }

    updateUnitInfo(sessionId: string, data?: any /* TODO PlayerUnitDTO */): void {
        const unit = this.getUnitInfo(sessionId);

        if (!unit) { return; }

        // TODO move logic to better place
        if (data && data.hasOwnProperty('scale')) {
            unit.updateModifier(new ScaleModifier({ scale: data.scale }));
        }

        this.GameSessionsService.sendMessage(sessionId, 'unitUpdates', new PlayerUnitInfoDTO(unit));
    }
}

export default new PlayersService(
    GameEvents,
    GameAction,
    GameSessions,
    UnitManipulations
);

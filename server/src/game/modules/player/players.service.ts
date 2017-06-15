import { Player } from '../../classes/player.class';
import { UserModel } from '../../../database/database';
import GameEvents, { GameEventsService } from '../../game-events.service';
import GameAction, { GameActionsService } from '../../game-actions.service';
import PlayerUnit, { PlayerUnitService } from './player-unit.service';

export class PlayersService {
    private players: { [sessionId: string ]: Player } = {};

    constructor(private PlayerUnitService: PlayerUnitService,
                private GameEventsService: GameEventsService,
                private GameActionsService: GameActionsService) {
        this.GameEventsService.on('deleteSession', sessionId => this.remove(sessionId));

        this.GameActionsService.registerAction('user', (sessionId, { id }) => this.setupPlayer(sessionId, id));
        this.GameActionsService.registerAction('unitAction', (sessionId, data) => this.executeAction(sessionId, data));
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
            this.PlayerUnitService.create(player);
        });
    }

    remove(sessionId: string): void {
        const player = this.players[sessionId];
        const { id, unit } = player;
        UserModel.saveObject(id, unit);
        delete this.players[sessionId];
        this.PlayerUnitService.removeUnit(unit);
    }

    executeAction(sessionId: string, data: { action: number, value: any }): void {
        const player = this.players[sessionId];
        this.PlayerUnitService.executeAction(player, data);
    }
}

export default new PlayersService(
    PlayerUnit,
    GameEvents,
    GameAction
);

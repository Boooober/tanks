import { Player } from '../../classes/player.class';
import { UserModel } from '../../../database/database';
import GameEvents, { GameEventsService } from '../../game-events.service';
import GameAction, { GameActionsService } from '../../game-actions.service';

export class GamePlayersService {
    private players: { [sessionId: string ]: Player } = {};

    constructor(private GameEventsService: GameEventsService,
                private GameActionsService: GameActionsService) {
        this.GameEventsService.on('deleteSession', sessionId => this.remove(sessionId));
        // this.GameActionsService.registerAction('action', )

    }

    get(): Player[];
    get(sessionId: string): Player | null;
    get(sessionId?: string) {
        return sessionId
            ? this.players[sessionId] || null
            : Object.keys(this.players).map(session => this.players[session]);
    }

    create(sessionId: string, userId: string): void {
        UserModel.findById(userId, (error, user) => {
            const player = new Player(user, { sessionId });
            this.players[sessionId] = player;
            this.GameEventsService.exec('createPlayer', player, sessionId);
        });
    }

    remove(sessionId: string): void {
        const player = this.players[sessionId];
        const { id, unit } = player;
        UserModel.saveObject(id, unit);
        delete this.players[sessionId];
        this.GameEventsService.exec('deletePlayer', player, sessionId);
    }
}

export default new GamePlayersService(
    GameEvents,
    GameAction
);

import GameEvents, { GameEventsService } from './game-events.service';

export class LogService {
    static createSession(sessionId: string): void {
        console.log('New connection (ID#%d) at %s :)', sessionId, (new Date).toDateString());
    }

    static deleteSession(sessionId: string): void {
        console.log('Connection closed (ID#%d) at %s :(', sessionId, (new Date).toDateString());
    }

    constructor(private GameEventsService: GameEventsService) {
        this.GameEventsService.on('createSession', LogService.createSession);
        this.GameEventsService.on('deleteSession', LogService.deleteSession);
    }
}

export default new LogService(GameEvents);

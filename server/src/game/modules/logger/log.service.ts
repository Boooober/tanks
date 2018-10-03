import { Injectable } from 'injection-js';

@Injectable()
export class LogService {
    static createSession(sessionId: string): void {
        console.log('New connection (ID#%d) at %s :)', sessionId, (new Date()).toDateString());
    }

    static deleteSession(sessionId: string): void {
        console.log('Connection closed (ID#%d) at %s :(', sessionId, (new Date()).toDateString());
    }
}

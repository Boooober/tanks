import { GamePlayersExecutorService } from '../objects/game-players-executor.service';
// import { GameObjectsService } from '../game-objects/game-objects.service';

export class UserSessionsService {
  private static sessions/*: { id: number, session: WebSocket }*/ = {};

  static createSession(ws): number {
    const id = Math.floor(Math.random() * Date.now());
    UserSessionsService.sessions[id] = ws;

    ws.on('message', message => UserSessionsService.onMessage(id, message));
    ws.on('close', () => UserSessionsService.deleteSession(id));
    GamePlayersExecutorService.createPlayer(id);
    console.log('New connection %d :)', id);
    return id;
  }

  static deleteSession(id: number): void {
    console.log('Connection closed %d :(', id);
    GamePlayersExecutorService.removePlayer(id);
    delete UserSessionsService.sessions[id];
  }

  static sendMessage(session: WebSocket, method: string, data: any): void {
    const message = JSON.stringify({ method, data });
    session.send(message);
  }

  static sendAllMessage(method: string, data: any): void {
    const message = JSON.stringify({ method, data });
    Object.keys(UserSessionsService.sessions).forEach(id => {
      UserSessionsService.sessions[id].send(message);
    });
  }

  static onMessage(id: number, message: string): void {
    const { method, data } = JSON.parse(message);
    GamePlayersExecutorService.execute(id, method, data);
  }
}

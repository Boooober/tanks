import { GamePlayersExecutorService } from '../objects/game-players-executor.service';
// import { GameObjectsService } from '../game-objects/game-objects.service';

class UserSessionsService {
  private sessions/*: { id: number, session: WebSocket }*/ = {};

  createSession(ws): number {
    const id = Math.floor(Math.random() * Date.now());
    this.sessions[id] = ws;

    ws.on('message', message => this.onMessage(id, message));
    ws.on('close', () => this.deleteSession(id));
    GamePlayersExecutorService.createPlayer(id);
    console.log('New connection %d :)', id);
    return id;
  }

  deleteSession(id: number): void {
    console.log('Connection closed %d :(', id);
    GamePlayersExecutorService.removePlayer(id);
    delete this.sessions[id];
  }

  sendMessage(session: WebSocket, method: string, data: any): void {
    if (session.readyState === session.OPEN) {
      const message = JSON.stringify({ method, data });
      session.send(message);
    }
  }

  sendAllMessage(method: string, data: any): void {
    const message = JSON.stringify({ method, data });
    Object.keys(this.sessions).forEach(id => {
      this.sessions[id].send(message);
    });
  }

  onMessage(id: number, message: string): void {
    const { method, data } = JSON.parse(message);
    GamePlayersExecutorService.execute(id, method, data);
  }
}

export default new UserSessionsService;

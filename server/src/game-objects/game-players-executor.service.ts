import { Playground } from './playground.class';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GamePlayerCommands } from './game-player-commands.service';
import { GameObjectsService } from './game-objects.service';

export class GamePlayersExecutorService {
  private static players/*: {id: number, object: PlayerObject}*/ = {};

  static createPlayer(id: number): PlayerObject {
    const player = GameObjectsService.createPlayerObject();
    GameObjectsService.addObject(player);
    GamePlayersExecutorService.addPlayer(id, player);
    return player;
  }

  static addPlayer(id: number, object: PlayerObject): void {
    GamePlayersExecutorService.players[id] = object;
  }

  static removePlayer(id): void {
    delete GamePlayersExecutorService.players[id];
  }

  static execute(id, method, data): void {
    const object = GamePlayersExecutorService.players[id];

    switch(method) {
      case 'action':
        GamePlayersExecutorService.executeAction(object, data);
        break;
    }
  }

  static executeAction(player, data) {
    const { action, value } = data;
    switch(action) {
      case 'doFire':
        GamePlayerCommands.doFire(player, value);
        break;
      case 'moveUp':
        GamePlayerCommands.moveUp(player, value);
        break;
      case 'moveLeft':
        GamePlayerCommands.moveLeft(player, value);
        break;
      case 'moveRight':
        GamePlayerCommands.moveRight(player, value);
        break;
      case 'moveDown':
        GamePlayerCommands.moveDown(player, value);
        break;
    }
  }
}

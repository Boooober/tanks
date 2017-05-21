import { GameUser } from '../game-user.class';
import { BaseObject } from './classes/base-object.class';
import { BulletObject } from './classes/bullet-object.class';
import { PlayerObject } from './classes/player-object.class';
import GameObjectsCalculationsService from './game-objects-calculations.service';

class GameObjectsService {
    private players: { [sessionId: string]: PlayerObject; } = {};
    public objects: BaseObject[] = [];

    update(): void {
        this.clearObjects();
        this.objects.forEach(object => {
            switch (object.type) {
                case BulletObject.TYPE:
                    GameObjectsCalculationsService.calculateBullet(object as BulletObject);
                    GameObjectsCalculationsService.calculateBulletCollisions(object as BulletObject, this.objects);
                    break;
                case PlayerObject.TYPE:
                    GameObjectsCalculationsService.calculatePlayer(object as PlayerObject);
                    GameObjectsCalculationsService.calculatePlayerCollisions(object as PlayerObject, this.objects);
                    break;
            }
        });
    }

    createPlayer(sessionId: string, player: GameUser): void {
        const object = new PlayerObject({ username: player.name });
        player.unit
            ? Object.assign(object, player.unit)
            : Object.assign(object, {
                x: Math.floor(Math.random() * 1000),
                y: Math.floor(Math.random() * 700),
                deg: Math.floor(Math.random() * 360)
            });
        this.players[sessionId] = object;
        this.addObject(object);
    }

    removePlayer(sessionId: string): void {
        const player = this.players[sessionId];
        /**
         * PlayerObject will be removed automatically after death and at the end of session.
         * On closing session we should be sure that object exists to remove it anyway.
         *
         * @see clearObjects
         */
        if (player) {
            player.remove = true;
            delete this.players[sessionId];
        }
    }

    getPlayer(sessionId: string): PlayerObject {
        return this.players[sessionId];
    }

    addObject(object: BaseObject): void {
        this.objects.push(object);
    }

    clearObjects(): void {
        this.objects = this.objects.filter(object => !object.remove);
        Object.keys(this.players).forEach(sessionId => {
            if (this.players[sessionId].remove) {
                this.removePlayer(sessionId);
            }
        });
    }
}

export default new GameObjectsService;

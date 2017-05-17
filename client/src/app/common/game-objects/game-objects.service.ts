import { Injectable } from '@angular/core';

import { Playground } from './playground.class';
import { BulletObject } from './bullet-object.class';
import { PlayerObject } from './player-object.class';
import { GameObjectAbstract } from './game-object-abstract.class';
import { GameObjectsHelperService } from './game-objects-helper.service';


@Injectable()
export class GameObjectsService {
    private objects: GameObjectAbstract[] = [];

    draw(context: CanvasRenderingContext2D): void {
        this.objects.forEach(object => object.draw(context));
    }

    update(playground: Playground): void {
        this.objects.forEach(object => {
            object.update(playground);

            if (object instanceof PlayerObject) {
                this.calculatePlayer(object);
            } else if (object instanceof BulletObject) {
                this.calculateBullet(object);
            }
        });
        this.clearObjects();
    }

    addObject(object: GameObjectAbstract): void {
        this.objects.push(object);
    }

    clearObjects(): void {
        this.objects = this.objects.filter(object => !object.remove);
    }

    calculatePlayer(player: PlayerObject) {
        if (player.isFiring()) {
            const bullet = GameObjectsHelperService.playerFire(player);
            this.addObject(bullet);
        }
    }

    calculateBullet(bullet: BulletObject) {}

    createPlayer(options): PlayerObject {
        const player = GameObjectsHelperService.createPlayer(options);
        this.addObject(player);
        return player;
    }

    startAction(player: PlayerObject, event: KeyboardEvent) {
        GameObjectsHelperService.startAction(player, event);
    }

    finishAction(player: PlayerObject, event: KeyboardEvent) {
        GameObjectsHelperService.finishAction(player, event);
    }
}

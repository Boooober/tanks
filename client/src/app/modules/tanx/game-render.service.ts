import { Injectable } from '@angular/core';

import { GameObjectsService } from './game-objects.service';
import { BaseObject } from './entity/base-object';

@Injectable()
export class GameRenderService {
    private images: { [name: string]: HTMLImageElement } = {};

    constructor(
        private gameObjectsService: GameObjectsService
    ) {}

    draw(context: CanvasRenderingContext2D, objects: BaseObject[]): void {
        this.gameObjectsService.draw(context, objects, this.images);
    }

    setImages(images: { [name: string]: HTMLImageElement }): void {
        this.images = images;
    }
}

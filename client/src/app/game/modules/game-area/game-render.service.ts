import { Injectable } from '@angular/core';
import { BaseObject } from './objects/classes/base-object.class';
import { GameObjectsService } from './objects/game-objects.service';

@Injectable()
export class GameRenderService {
    private images: { [name: string]: HTMLImageElement } = {};

    constructor(private GameObjectsService: GameObjectsService) {}

    draw(context: CanvasRenderingContext2D, objects: BaseObject[]): void {
        this.GameObjectsService.draw(context, objects, this.images);
    }

    setImages(images: { [name: string]: HTMLImageElement }): void {
        this.images = images;
    }
}

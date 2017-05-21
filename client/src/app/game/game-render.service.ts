import { Injectable } from '@angular/core';
import { GameObjectsService } from './objects/game-objects.service';

@Injectable()
export class GameRenderService {
    private images = {};

    constructor(private GameObjectsService: GameObjectsService) {}

    draw(context: CanvasRenderingContext2D, objects) {
        this.GameObjectsService.draw(context, objects, this.images);
    }

    setImages(images) {
        this.images = images;
    }
}

import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GameObjectsService } from '../../common/game-objects/game-objects.service';

@Component({
    selector: 'app-game-area',
    templateUrl: './game-area.component.html',
    styleUrls: ['./game-area.component.scss']
})
export class GameAreaComponent implements OnInit {
    @ViewChild('gameArea') gameArea: ElementRef;

    private context: CanvasRenderingContext2D;

    constructor(private NgZone: NgZone,
                private App: AppComponent,
                private GameObjectsService: GameObjectsService) {
    }

    ngOnInit() {
        this.context = this.gameArea.nativeElement.getContext('2d');
        this.requestNextFrame();
    }

    render() {
        const { width, height } = this.App;

        this.context.canvas.height = height;
        this.context.canvas.width = width;

        this.GameObjectsService.update({ width, height });

        this.context.clearRect(0, 0, width, height);
        this.context.save();
        this.context.beginPath();
        this.GameObjectsService.draw(this.context);
        this.context.restore();
    }

    private requestNextFrame() {
        this.NgZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                this.render();
                this.requestNextFrame();
            });
        });
    }
}

import { Subscription } from 'rxjs/Rx';
import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GameObjectsService } from '../../objects/game-objects.service';
import { ConnectionService } from '../../connection/connection.service';
import { GameObjectProperties } from '../../objects/game-object-properties.class';

@Component({
    selector: 'app-game-area',
    templateUrl: './game-area.component.html',
    styleUrls: ['./game-area.component.scss']
})
export class GameAreaComponent implements OnInit, OnDestroy {
    @ViewChild('gameArea') gameArea: ElementRef;
    @ViewChild('tankImage') tankImage: ElementRef;
    @ViewChild('tankFireImage') tankFireImage: ElementRef;

    private context: CanvasRenderingContext2D;

    private objectsSubscription: Subscription;

    constructor(private App: AppComponent,
                private ConnectionService: ConnectionService,
                private GameObjectsService: GameObjectsService) {
    }

    ngOnInit(): void {
        this.context = this.gameArea.nativeElement.getContext('2d');
        this.setImages();
        this.objectsSubscription = this.ConnectionService.getObjectsStream()
            .subscribe((objects: GameObjectProperties[]) => this.render(objects));
    }

    ngOnDestroy(): void {
        this.objectsSubscription.unsubscribe();
    }

    render(objects: GameObjectProperties[]): void {
        const { width, height } = this.App;

        this.context.canvas.height = height;
        this.context.canvas.width = width;
        this.context.clearRect(0, 0, width, height);
        this.GameObjectsService.draw(this.context, objects);
    }

    setImages(): void {
        this.GameObjectsService.setImages({
            tank: this.tankImage.nativeElement,
            tankFire: this.tankFireImage.nativeElement,
        });
    }

    @HostListener('window:keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent): void {
        this.GameObjectsService.finishAction(event);
    }

    @HostListener('window:keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        this.GameObjectsService.startAction(event);
    }
}

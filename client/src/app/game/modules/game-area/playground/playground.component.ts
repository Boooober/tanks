import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { BaseObject } from '../objects/classes/base-object.class';
import { GameRenderService } from '../game-render.service';
import { PlaygroundService } from './playground.service';

@Component({
    selector: 'app-playground',
    providers: [PlaygroundService],
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
    @ViewChild('gameArea') gameArea: ElementRef;
    @ViewChild('tankImage') tankImage: ElementRef;
    @ViewChild('tankFireImage') tankFireImage: ElementRef;

    private context: CanvasRenderingContext2D;

    constructor(private App: AppComponent,
                private PlaygroundService: PlaygroundService,
                private GameRenderService: GameRenderService) {
    }

    ngOnInit(): void {
        this.setUserOptions();
        this.context = this.gameArea.nativeElement.getContext('2d');
        this.PlaygroundService.subscribe((objects: BaseObject[]) => this.render(objects));
    }

    ngOnDestroy(): void {
        this.PlaygroundService.unsubscribe();
    }

    render(objects: BaseObject[]): void {
        const { width, height } = this.App;

        this.context.canvas.height = height;
        this.context.canvas.width = width;
        this.context.clearRect(0, 0, width, height);
        this.GameRenderService.draw(this.context, objects);
    }

    private setUserOptions(): void {
        this.GameRenderService.setImages({
            tank: this.tankImage.nativeElement,
            tankFire: this.tankFireImage.nativeElement
        });
    }

    @HostListener('window:keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent): void {
        this.PlaygroundService.finishAction(event);
    }

    @HostListener('window:keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        this.PlaygroundService.startAction(event);
    }
}

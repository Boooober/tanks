import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';

import { AppComponent } from '../../../../app.component';
import { GameRenderService } from '../../game-render.service';
import { PlaygroundService } from './playground.service';

import { BaseObject } from '../../entity/base-object';

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

    constructor(
        private app: AppComponent,
        private playgroundService: PlaygroundService,
        private gameRenderService: GameRenderService
    ) {}

    ngOnInit(): void {
        this.setUserOptions();
        this.context = this.gameArea.nativeElement.getContext('2d');
        this.playgroundService.subscribe((objects: BaseObject[]) => this.render(objects));
    }

    ngOnDestroy(): void {
        this.playgroundService.unsubscribe();
    }

    render(objects: BaseObject[]): void {
        const { width, height } = this.app;

        this.context.canvas.height = height;
        this.context.canvas.width = width;
        this.context.clearRect(0, 0, width, height);
        this.gameRenderService.draw(this.context, objects);
    }

    private setUserOptions(): void {
        this.gameRenderService.setImages({
            tank: this.tankImage.nativeElement,
            tankFire: this.tankFireImage.nativeElement
        });
    }

    @HostListener('window:keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent): void {
        this.playgroundService.finishAction(event);
    }

    @HostListener('window:keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        this.playgroundService.startAction(event);
    }
}

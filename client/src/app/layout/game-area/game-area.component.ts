import { Component, ElementRef, OnInit, ViewChild, NgZone, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GameObjectsService } from '../../common/game-objects/game-objects.service';
import { UserService } from '../../common/user/user.service';

@Component({
    selector: 'app-game-area',
    templateUrl: './game-area.component.html',
    styleUrls: ['./game-area.component.scss']
})
export class GameAreaComponent implements OnInit {
    @ViewChild('gameArea') gameArea: ElementRef;
    @ViewChild('tankImage') tankImage: ElementRef;
    @ViewChild('tankFireImage') tankFireImage: ElementRef;

    private context: CanvasRenderingContext2D;

    constructor(private NgZone: NgZone,
                private App: AppComponent,
                private UserService: UserService,
                private GameObjectsService: GameObjectsService) {
    }

    ngOnInit() {
        this.context = this.gameArea.nativeElement.getContext('2d');
        this.requestNextFrame();
        this.UserService.createUnit({
            image: this.tankImage.nativeElement,
            fireImage: this.tankFireImage.nativeElement
        });
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

    @HostListener('window:keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent) {
        this.UserService.finishAction(event);
    }

    @HostListener('window:keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent) {
        this.UserService.startAction(event);
    }
}

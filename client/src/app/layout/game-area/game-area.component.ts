import { Component, ElementRef, OnInit, ViewChild, NgZone, HostListener, OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GameObjectsService } from '../../common/game-objects/game-objects.service';
import { ConnectionService } from '../../common/connection/connection.service';
import { GameObjectProperties } from '../../common/game-objects/game-object-properties.class';

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

  private objectsSubscription;

  constructor(private App: AppComponent,
              private ConnectionService: ConnectionService,
              private GameObjectsService: GameObjectsService) {
  }

  ngOnInit() {
    this.context = this.gameArea.nativeElement.getContext('2d');
    this.objectsSubscription = this.ConnectionService.getObjectsStream()
      .subscribe((objects: GameObjectProperties[]) => this.render(objects));
  }

  ngOnDestroy() {
    this.objectsSubscription.unsubscribe()
  }

  render(objects: GameObjectProperties[]) {
    const {width, height} = this.App;

    this.context.canvas.height = height;
    this.context.canvas.width = width;
    this.context.clearRect(0, 0, width, height);
    objects.forEach(object => this.GameObjectsService.draw(this.context, object));
  }

  @HostListener('window:keyup', ['$event'])
  private onKeyUp(event: KeyboardEvent) {
    this.GameObjectsService.finishAction(event);
  }

  @HostListener('window:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    this.GameObjectsService.startAction(event);
  }
}

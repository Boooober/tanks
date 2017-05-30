import { Component, Input } from '@angular/core';
import { User } from '../auth-forms/user.class';

@Component({
    selector: 'app-game',
    template: `<app-info-panel [user]="user"></app-info-panel><app-game-area></app-game-area><app-side-panel></app-side-panel>`,
})
export class GameComponent {
  @Input() user;
}

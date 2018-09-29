import { Component } from '@angular/core';

@Component({
    selector: 'app-game-area',
    template: `<app-playground></app-playground><app-side-panel></app-side-panel>`,
    styles: [`:host {
        cursor: default;
        user-select: none;
    }`]
})
export class GameAreaComponent {}

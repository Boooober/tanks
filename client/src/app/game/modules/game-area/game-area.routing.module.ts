import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameAreaComponent } from './game-area.component';

const routes: Routes = [
    {
        path: '',
        component: GameAreaComponent,
        data: { title: 'Tanxx!!!' }
    }
];

export const gameAreaRoutingComponents = [GameAreaComponent];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class GameAreaRoutingModule {}

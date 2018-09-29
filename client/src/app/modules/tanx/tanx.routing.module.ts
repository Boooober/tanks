import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '../../core/authentication/authorized.guard';

import { GameAreaComponent } from './game-area.component';

const routes: Routes = [
    {
        path: 'game',
        component: GameAreaComponent,
        data: {
            title: 'Tanxx!!!'
        },
        canActivate: [AuthorizedGuard]
    }
];

export const tanxRoutingComponents = [
    GameAreaComponent
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TanxRoutingModule {}

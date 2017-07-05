import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './core/guards/authorized.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: 'app/game/modules/registration/registration.module#RegistrationModule'
    },
    {
        path: 'game',
        loadChildren: 'app/game/modules/game-area/game-area.module#GameAreaModule',
        data: { backgroundPreload: true },
        canActivate: [AuthorizedGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class GameRoutingModule {}

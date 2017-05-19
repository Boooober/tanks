import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';

import { GameComponent } from './game.component';
import { GameAreaComponent } from './layout/game-area/game-area.component';
import { InfoPanelComponent } from './layout/info-panel/info-panel.component';

import { GameObjectsService } from './objects/game-objects.service';
import { UserConnectionService } from './connection/user-connection.service';

/* Routes */
import { routes } from './game.routes';

@NgModule({
    declarations: [
        GameComponent,
        GameAreaComponent,
        InfoPanelComponent
    ],
    imports: [
        BrowserModule,
        UIRouterModule.forChild({ states: [...routes]})
    ],
    exports: [
        GameAreaComponent,
        InfoPanelComponent
    ],
    providers: [
        GameObjectsService,
        UserConnectionService
    ]
})
export class GameModule {}

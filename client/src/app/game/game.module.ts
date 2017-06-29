import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UIRouterModule } from '@uirouter/angular';
import { NouisliderModule } from 'ng2-nouislider';

import { GameComponent } from './game.component';
import { GameAreaComponent } from './layout/game-area/game-area.component';
// import { InfoPanelComponent } from './layout/info-panel/info-panel.component';
import { SidePanelComponent } from './layout/side-panel/side-panel.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { UsersControlsComponent } from './components/user-controls/user-controls.component';
import { UsersStatisticsComponent } from './components/users-statistics/users-statistics.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { PlayerUnitInfoModel } from './models/player-unit-info.model';

import { GameRenderService } from './game-render.service';
import { GameObjectsService } from './objects/game-objects.service';
import { UserConnectionService } from './connection/user-connection.service';

/* Routes */
import { routes } from './game.routes';

@NgModule({
    declarations: [
        GameComponent,
        GameAreaComponent,
        // InfoPanelComponent,
        SidePanelComponent,
        UnitInfoComponent,
        UsersControlsComponent,
        UsersStatisticsComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        NouisliderModule,
        UiComponentsModule,
        UIRouterModule.forChild({ states: [...routes]})
    ],
    providers: [
        GameRenderService,
        GameObjectsService,
        PlayerUnitInfoModel,
        UserConnectionService
    ]
})
export class GameModule {}

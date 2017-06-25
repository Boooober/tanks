import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { NouisliderModule } from 'ng2-nouislider';

import { GameComponent } from './game.component';
import { GameAreaComponent } from './layout/game-area/game-area.component';
// import { InfoPanelComponent } from './layout/info-panel/info-panel.component';
import { SidePanelComponent } from './layout/side-panel/side-panel.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { UsersControlsComponent } from './components/user-controls/user-controls.component';
import { UsersStatisticsComponent } from './components/users-statistics/users-statistics.component';
import { TabsComponent } from './components/tabs/panel-tabs';
import { TabButtonComponent } from './components/tabs/panel-tab-button';
import { TabContentComponent } from './components/tabs/panel-tab-content';

import { PlayerUnitModel } from './models/player-unit.model';

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
        TabsComponent,
        TabButtonComponent,
        TabContentComponent,
        UsersStatisticsComponent
    ],
    imports: [
        BrowserModule,
        NouisliderModule,
        UIRouterModule.forChild({ states: [...routes]})
    ],
    providers: [
        PlayerUnitModel,
        GameRenderService,
        GameObjectsService,
        UserConnectionService
    ]
})
export class GameModule {}

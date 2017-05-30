import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';

import { GameComponent } from './game.component';
import { GameAreaComponent } from './layout/game-area/game-area.component';
// import { InfoPanelComponent } from './layout/info-panel/info-panel.component';
import { SidePanelComponent } from './layout/side-panel/side-panel.component';
import { UsersControlsComponent } from './components/user-controls/user-controls.component';
import { UsersStatisticsComponent } from './components/users-statistics/users-statistics.component';
import { TabsComponent } from './components/tabs/panel-tabs';
import { TabButtonComponent } from './components/tabs/panel-tab-button';
import { TabContentComponent } from './components/tabs/panel-tab-content';

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
        UsersControlsComponent,
        TabsComponent,
        TabButtonComponent,
        TabContentComponent,
        UsersStatisticsComponent
    ],
    imports: [
        BrowserModule,
        UIRouterModule.forChild({ states: [...routes]})
    ],
    providers: [
        GameRenderService,
        GameObjectsService,
        UserConnectionService
    ]
})
export class GameModule {}

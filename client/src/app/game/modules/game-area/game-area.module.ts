import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NouisliderModule } from 'ng2-nouislider';
import { UiComponentsModule } from '../../../ui-components/ui-components.module';
import { GameAreaRoutingModule, gameAreaRoutingComponents } from './game-area.routing.module';

import { PlayerUnitInfoModel } from '../../models/player-unit-info.model';

import { SidePanelComponent } from './side-panel/side-panel.component';
import { PlaygroundComponent } from './playground/playground.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { UsersControlsComponent } from './components/user-controls/user-controls.component';
import { UsersStatisticsComponent } from './components/users-statistics/users-statistics.component';

import { GameRenderService } from './game-render.service';
import { GameObjectsService } from './objects/game-objects.service';

@NgModule({
    declarations: [
        SidePanelComponent,
        PlaygroundComponent,
        UnitInfoComponent,
        UsersControlsComponent,
        UsersStatisticsComponent,
        gameAreaRoutingComponents
    ],
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        NouisliderModule,
        UiComponentsModule,
        GameAreaRoutingModule
    ],
    providers: [
        GameRenderService,
        GameObjectsService,
        PlayerUnitInfoModel
    ]
})
export class GameAreaModule {}

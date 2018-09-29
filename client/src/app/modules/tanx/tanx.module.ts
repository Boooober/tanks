import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { NouisliderModule } from 'ng2-nouislider';
import { SharedModule } from '../../shared/shared.module';
import { TanxRoutingModule, tanxRoutingComponents } from './tanx.routing.module';

import { PlayerUnitInfoModel } from './entity/player-unit-info.model';

import { SidePanelComponent } from './panels/side-panel/side-panel.component';
import { PlaygroundComponent } from './panels/playground/playground.component';
import { UnitInfoComponent } from './panels/unit-info/unit-info.component';
import { UsersControlsComponent } from './panels/user-controls/user-controls.component';
import { UsersStatisticsComponent } from './panels/users-statistics/users-statistics.component';

import { GameRenderService } from './game-render.service';
import { GameObjectsService } from './game-objects.service';
import { tanxSocketConnection } from './tanx-socket-connection';

@NgModule({
    declarations: [
        SidePanelComponent,
        PlaygroundComponent,
        UnitInfoComponent,
        UsersControlsComponent,
        UsersStatisticsComponent,
        tanxRoutingComponents
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        // NouisliderModule,
        SharedModule,
        TanxRoutingModule
    ],
    providers: [
        GameRenderService,
        GameObjectsService,
        PlayerUnitInfoModel,
        tanxSocketConnection
    ]
})
export class TanxModule {}

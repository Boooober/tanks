import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GameAreaComponent } from './layout/game-area/game-area.component';
import { InfoPanelComponent } from './layout/info-panel/info-panel.component';

import { ConnectionService } from './common/connection/connection.service';
import { GameObjectsService } from './common/game-objects/game-objects.service';


@NgModule({
    declarations: [
        AppComponent,
        GameAreaComponent,
        InfoPanelComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        ConnectionService,
        GameObjectsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

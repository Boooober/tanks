import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game.routing.module';

/** Core */
import { AuthService } from './core/auth.service';
import { AuthorizedGuard } from './core/guards/authorized.guard';
import { CanDeactivateGuard } from './core/guards/can-deactivate.guard';

import { UserConnectionService } from './core/connection/user-connection.service';

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        GameRoutingModule,
    ],
    providers: [
        AuthService,
        AuthorizedGuard,
        CanDeactivateGuard,
        UserConnectionService
    ]
})
export class GameModule {}

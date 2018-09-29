import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SocketConnection } from './socket/socket-connection';
import { AuthorizedGuard } from './authentication/authorized.guard';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SocketConnection,
        AuthorizedGuard,
        AuthenticationService
    ]
})
export class CoreModule {}

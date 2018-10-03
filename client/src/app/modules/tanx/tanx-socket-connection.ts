import { Injector } from '@angular/core';

import { StreamData } from '../../core/socket/entity';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { SocketConnection, ON_SOCKET_CONNECTED } from '../../core/socket/socket-connection';
import { SocketCommand } from '../../../../../common/socket-command.enum';

export function onSocketConnection(injector: Injector): () => void {
    return () => {
        const socketConnection = injector.get<SocketConnection>(SocketConnection);
        const authenticationService = injector.get<AuthenticationService>(AuthenticationService);

        socketConnection.send(new StreamData(SocketCommand.USER, authenticationService.getPlayer()));
    };
}

export const tanxSocketConnection = {
    provide: ON_SOCKET_CONNECTED,
    useFactory: onSocketConnection,
    deps: [Injector],
    multi: true
};

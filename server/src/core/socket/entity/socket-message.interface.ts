import { SocketCommand } from '../../../../../common/socket-command.enum';

export interface ISocketMessage {
    action: SocketCommand;
    payload?: any;
}

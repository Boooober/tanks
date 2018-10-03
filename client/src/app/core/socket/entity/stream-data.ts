import { SocketCommand } from '../../../../../../common/socket-command.enum';

export class StreamData {

    constructor(
        public readonly action: SocketCommand,
        public readonly payload: any
    ) {}
}

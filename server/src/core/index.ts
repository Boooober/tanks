import loader from './di/loader';
import { SocketConnection } from './socket/socket-connection';

export const setupCore = () => {
    loader.addProviders([
        SocketConnection
    ]);
};

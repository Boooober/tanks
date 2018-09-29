import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';

import api from './api';
import game from './game';

export const PORT = 8080;

export default (): express.Express => {
    const server: express.Express = express();

    server.use(cors());
    server.use(express.urlencoded());
    server.use(express.json());
    server.use(api(server));

    game.init(server);

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });

    return server;
};

import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';

import api from './api';
import TheGame from './game';

export const PORT = 8080;

export default (): express.Express => {
    const server: express.Express = express();

    server.use(cors());
    server.use(express.urlencoded());
    server.use(express.json());
    server.use(api(server));

    TheGame.init(server);

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });

    return server;
};

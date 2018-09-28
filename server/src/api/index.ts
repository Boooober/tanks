import { Express, Router } from 'express';

import errorHandlerMiddleware from './error-handler.middleware';
import authenticationMiddleware from './authentication/authentication.middleware';

import login from './authentication/login';
import signin from './authentication/signin';

export default (server: Express): Router => Router()
    .get('/favicon.ico', (req, res) => res.end())

    .use(
        '/api',
        Router()
            .use(login)
            .use(signin)
    )

    .use(authenticationMiddleware)

    .use(errorHandlerMiddleware)
    .use((req, res) => res.redirect('/'));

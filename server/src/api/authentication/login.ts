import { Router, Request, Response, NextFunction } from 'express';

import { authenticateByCredentials } from './authentication.service';

export default Router()
    .post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { username, password } = req.body;

        try {
            return res.send(await authenticateByCredentials({ username, password }));
        } catch (error) {
            next(error);
        }
    });

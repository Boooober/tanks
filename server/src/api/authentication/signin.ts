import { Router, Request, Response, NextFunction } from 'express';

import { registerUser } from './authentication.service';

export default Router()
    .post('/signin', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { name: username, password } = req.body;

        try {
            return res
                .status(201)
                .send(registerUser({ username, password }));
        } catch (error) {
            next(error);
        }
    });

import { NextFunction, Request, Response } from 'express';

import { authenticateByCredentials } from './authentication.service';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const credentials = req.body;

    try {
        Object.assign(req, { user: await authenticateByCredentials(credentials) });
        next();
    } catch (error) {
        next({ ...error,  status: 401 });
    }
};

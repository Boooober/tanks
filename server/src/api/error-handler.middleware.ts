import { Request, Response, NextFunction } from 'express';

export default (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof Error || error instanceof TypeError) {
        res.status((error as any).statusCode || 500).send({ type: error.message });
    } else {
        res.status(error.statusCode).send(error);
    }
};

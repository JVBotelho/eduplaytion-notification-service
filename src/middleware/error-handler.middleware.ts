import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    console.error(error);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
    });
}

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function hasValidJWTToken(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.decode(token);
        const { userId } = data as TokenPayload;

        request.userId = userId;

        next();
    } catch {
        return response.sendStatus(401);
    }
}

type TokenPayload = {
    userId: number;
    iat: number;
    exp: number;
};

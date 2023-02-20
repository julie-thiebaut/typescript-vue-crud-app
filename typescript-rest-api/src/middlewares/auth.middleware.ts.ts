import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, UserInstance } from '../models/user';
import { HttpCode } from '../utils/http-exception';

export interface AuthRequest extends Request {
    token: string | JwtPayload;
}

export interface JwtCustomPayload {
    id: string;
    name: string;
}

export const secret: string = process.env.SECRET_KEY ?? 'your-secret-key';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, secret);
        (req as AuthRequest).token = decoded;
        const customJWT = decoded as JwtCustomPayload;
        const user: UserInstance | null = await User.findByPk(customJWT.id);
        if (!user) {
            throw new Error();
        }
        next();
    } catch (err) {
        res.status(HttpCode.UNAUTHORIZED).send('Please authenticate');
    }
};

import { RequestHandler } from 'express';
import HttpException, { HttpCode } from '../utils/http-exception';
import { UserAddAttributes, UserInstance } from '../models/user';
import bcrypt from 'bcrypt';
import { JwtCustomPayload } from '../middlewares/auth.middleware.ts';
import {
    create,
    getAll,
    getByEmail,
    getById,
    getDecodedToken,
    getToken,
    remove,
    update,
} from '../services/user.service';

export const login: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as UserAddAttributes;
        const user: UserInstance | null = await getByEmail(payload.email);
        if (!user) {
            throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
        }
        const isMatch = bcrypt.compareSync(payload.password, user.password);
        if (isMatch) {
            const token = getToken(user.id, user.email);
            res.cookie('jwt', token, {
                httpOnly: false,
                expires: new Date(Date.now() + 900000),
            });
            return res.status(HttpCode.OK).json({
                message: 'User authenticated successfully',
                data: { token },
            });
        } else {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'Password is not correct',
            );
        }
    } catch (err) {
        next(err);
    }
};

export const getUserByJWT: RequestHandler = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new HttpException(HttpCode.UNAUTHORIZED, 'Unauthorized');
        }
        const decoded = getDecodedToken(token) as JwtCustomPayload;
        const user: UserInstance | null = await getById(decoded.id);
        if (!user) {
            throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
        }
        return res
            .status(HttpCode.OK)
            .json({ message: 'User fetched successfully', data: user });
    } catch (err) {
        next(err);
    }
};

export const register: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as UserAddAttributes;
        const user = await create(payload);
        return res
            .status(HttpCode.CREATED)
            .json({ message: 'User created successfully', data: user });
    } catch (err) {
        next(err);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser: UserInstance | null = await getById(id);
        if (!deletedUser) {
            throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
        }
        await remove(id);
        return res
            .status(HttpCode.OK)
            .json({ message: 'User deleted successfully', data: deletedUser });
    } catch (err) {
        next(err);
    }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
    try {
        const allUsers: UserInstance[] = await getAll();
        return res
            .status(HttpCode.OK)
            .json({ message: 'User fetched successfully', data: allUsers });
    } catch (err) {
        next(err);
    }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user: UserInstance | null = await getById(id);
        if (!user) {
            throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
        }
        return res
            .status(HttpCode.OK)
            .json({ message: 'User fetched successfully', data: user });
    } catch (err) {
        next(err);
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const payload = req.body as UserAddAttributes;
        await update(payload, id);
        const updatedUsers: UserInstance | null = await getById(id);
        if (!updatedUsers) {
            throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
        }
        return res
            .status(HttpCode.OK)
            .json({ message: 'User updated successfully', data: updatedUsers });
    } catch (err) {
        next(err);
    }
};

import { User, UserAddAttributes, UserInstance } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtCustomPayload, secret } from '../middlewares/auth.middleware.ts';

const saltRounds = 8;

export async function create({
    email,
    password,
}: UserAddAttributes): Promise<UserInstance | null> {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return User.create({ email, password: hash });
    } catch (error) {
        throw error;
    }
}

export function getToken(id: string, email: string): string {
    try {
        return jwt.sign({ id, email }, secret);
    } catch (error) {
        throw error;
    }
}

export function getDecodedToken(token: string): JwtCustomPayload {
    try {
        return jwt.verify(token, secret) as JwtCustomPayload;
    } catch (error) {
        throw error;
    }
}

export async function update(
    { email, password }: UserAddAttributes,
    id: string,
): Promise<[affectedCount: number]> {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return await User.update({ email, password: hash }, { where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getById(id: string): Promise<UserInstance | null> {
    try {
        return await User.findByPk(id, {
            attributes: ['id', 'email'],
        });
    } catch (error) {
        throw error;
    }
}

export async function getByEmail(email: string): Promise<UserInstance | null> {
    try {
        return await User.findOne({
            where: { email },
        });
    } catch (error) {
        throw error;
    }
}

export async function remove(id: string): Promise<number> {
    try {
        return await User.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getAll(): Promise<UserInstance[]> {
    try {
        return await User.findAll({
            attributes: ['id', 'email'],
        });
    } catch (error) {
        throw error;
    }
}

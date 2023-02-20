import { RequestHandler } from 'express';
import HttpException, { HttpCode } from '../utils/http-exception';
import {
    ConnectionAddAttributes,
    ConnectionInstance,
} from '../models/connection';
import {
    getAll,
    create,
    getById,
    remove,
    update,
} from '../services/connection.service';
import { getMachineById } from '../services/machine.service';

export const createConnection: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as ConnectionAddAttributes;
        const machine = await getMachineById(Number(req.body.machineId));
        if (!machine) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineID not found',
            );
        }
        const connectedToMachine = await getMachineById(
            Number(req.body.connectedToMachineId),
        );
        if (!connectedToMachine) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'connectedToMachineId not found',
            );
        }
        const connections = await create(payload);
        return res.status(HttpCode.CREATED).json({
            message: 'Connection created successfully',
            data: connections,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteConnection: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'ConnectionID should be an integer',
            );
        }
        const deletedConnection: ConnectionInstance | null = await getById(id);
        if (!deletedConnection) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Connection not found');
        }
        await remove(id);
        return res.status(HttpCode.OK).json({
            message: 'Connection deleted successfully',
            data: deletedConnection,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllConnection: RequestHandler = async (req, res, next) => {
    try {
        const allConnections: ConnectionInstance[] = await getAll(req.query);
        return res.status(HttpCode.OK).json({
            message: 'Connection fetched successfully',
            data: allConnections,
        });
    } catch (err) {
        next(err);
    }
};

export const getConnectionById: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'ConnectionID should be an integer',
            );
        }
        const connection: ConnectionInstance | null = await getById(id);
        if (!connection) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Connection not found');
        }
        return res.status(HttpCode.OK).json({
            message: 'Connection fetched successfully',
            data: connection,
        });
    } catch (err) {
        next(err);
    }
};

export const updateConnection: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'ConnectionID should be an integer',
            );
        }
        const payload = req.body as ConnectionAddAttributes;
        await update(payload, id);
        const updatedConnections: ConnectionInstance | null = await getById(id);
        if (!updatedConnections) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Connection not found');
        }
        return res.status(HttpCode.OK).json({
            message: 'Connection updated successfully',
            data: updatedConnections,
        });
    } catch (err) {
        next(err);
    }
};

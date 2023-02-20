import { RequestHandler } from 'express';
import HttpException, { HttpCode } from '../utils/http-exception';
import { MachineAddAttributes, MachineInstance } from '../models/machine';
import {
    getAll,
    create,
    getById,
    remove,
    update,
} from '../services/machine.service';

export const createMachine: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as MachineAddAttributes;
        const machines = await create(payload);
        return res
            .status(HttpCode.CREATED)
            .json({ message: 'Machine created successfully', data: machines });
    } catch (err) {
        next(err);
    }
};

export const deleteMachine: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineID should be an integer',
            );
        }
        const deletedMachine: MachineInstance | null = await getById(id);
        if (!deletedMachine) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Machine not found');
        }
        await remove(id);
        return res.status(HttpCode.OK).json({
            message: 'Machine deleted successfully',
            data: deletedMachine,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllMachine: RequestHandler = async (req, res, next) => {
    try {
        const allMachines: MachineInstance[] = await getAll(req.query);
        return res.status(HttpCode.OK).json({
            message: 'Machine fetched successfully',
            data: allMachines,
        });
    } catch (err) {
        next(err);
    }
};

export const getMachineById: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineID should be an integer',
            );
        }
        const machine: MachineInstance | null = await getById(id);
        if (!machine) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Machine not found');
        }
        return res
            .status(HttpCode.OK)
            .json({ message: 'Machine fetched successfully', data: machine });
    } catch (err) {
        next(err);
    }
};

export const updateMachine: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineID should be an integer',
            );
        }
        const payload = req.body as MachineAddAttributes;
        await update(payload, id);
        const updatedMachines: MachineInstance | null = await getById(id);
        if (!updatedMachines) {
            throw new HttpException(HttpCode.NOT_FOUND, 'Machine not found');
        }
        return res.status(HttpCode.OK).json({
            message: 'Machine updated successfully',
            data: updatedMachines,
        });
    } catch (err) {
        next(err);
    }
};

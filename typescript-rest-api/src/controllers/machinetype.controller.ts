import { RequestHandler } from 'express';
import HttpException, { HttpCode } from '../utils/http-exception';
import {
    MachineTypeAddAttributes,
    MachineTypeInstance,
} from '../models/machinetype';
import {
    getAll,
    create,
    getById,
    remove,
    update,
} from '../services/machinetype.service';

export const createMachineType: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as MachineTypeAddAttributes;
        const machinetypes = await create(payload);
        return res.status(HttpCode.CREATED).json({
            message: 'MachineType created successfully',
            data: machinetypes,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteMachineType: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineTypeID should be an integer',
            );
        }
        const deletedMachineType: MachineTypeInstance | null = await getById(
            id,
        );
        if (!deletedMachineType) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineType not found',
            );
        }
        await remove(id);
        return res.status(HttpCode.OK).json({
            message: 'MachineType deleted successfully',
            data: deletedMachineType,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllMachineType: RequestHandler = async (req, res, next) => {
    try {
        const allMachineTypes: MachineTypeInstance[] = await getAll(req.query);
        return res.status(HttpCode.OK).json({
            message: 'MachineType fetched successfully',
            data: allMachineTypes,
        });
    } catch (err) {
        next(err);
    }
};

export const getMachineTypeById: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineTypeID should be an integer',
            );
        }
        const machinetype: MachineTypeInstance | null = await getById(id);
        if (!machinetype) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineType not found',
            );
        }
        return res.status(HttpCode.OK).json({
            message: 'MachineType fetched successfully',
            data: machinetype,
        });
    } catch (err) {
        next(err);
    }
};

export const updateMachineType: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineTypeID should be an integer',
            );
        }
        const payload = req.body as MachineTypeAddAttributes;
        await update(payload, id);
        const updatedMachineTypes: MachineTypeInstance | null = await getById(
            id,
        );
        if (!updatedMachineTypes) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineType not found',
            );
        }
        return res.status(HttpCode.OK).json({
            message: 'MachineType updated successfully',
            data: updatedMachineTypes,
        });
    } catch (err) {
        next(err);
    }
};

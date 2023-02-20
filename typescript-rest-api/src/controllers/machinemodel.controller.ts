import { RequestHandler } from 'express';
import HttpException, { HttpCode } from '../utils/http-exception';
import {
    MachineModelAddAttributes,
    MachineModelInstance,
} from '../models/machinemodel';
import {
    getAll,
    create,
    getById,
    remove,
    update,
} from '../services/machinemodel.service';

export const createMachineModel: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body as MachineModelAddAttributes;
        const machinemodels = await create(payload);
        return res.status(HttpCode.CREATED).json({
            message: 'MachineModel created successfully',
            data: machinemodels,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteMachineModel: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineModelID should be an integer',
            );
        }
        const deletedMachineModel: MachineModelInstance | null = await getById(
            id,
        );
        if (!deletedMachineModel) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineModel not found',
            );
        }
        await remove(id);
        return res.status(HttpCode.OK).json({
            message: 'MachineModel deleted successfully',
            data: deletedMachineModel,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllMachineModel: RequestHandler = async (req, res, next) => {
    try {
        const allMachineModels: MachineModelInstance[] = await getAll(
            req.query,
        );
        return res.status(HttpCode.OK).json({
            message: 'MachineModel fetched successfully',
            data: allMachineModels,
        });
    } catch (err) {
        next(err);
    }
};

export const getMachineModelById: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineModelID should be an integer',
            );
        }
        const machinemodel: MachineModelInstance | null = await getById(id);
        if (!machinemodel) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineModel not found',
            );
        }
        return res.status(HttpCode.OK).json({
            message: 'MachineModel fetched successfully',
            data: machinemodel,
        });
    } catch (err) {
        next(err);
    }
};

export const updateMachineModel: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new HttpException(
                HttpCode.BAD_REQUEST,
                'MachineModelID should be an integer',
            );
        }
        const payload = req.body as MachineModelAddAttributes;
        await update(payload, id);
        const updatedMachineModels: MachineModelInstance | null = await getById(
            id,
        );
        if (!updatedMachineModels) {
            throw new HttpException(
                HttpCode.NOT_FOUND,
                'MachineModel not found',
            );
        }
        return res.status(HttpCode.OK).json({
            message: 'MachineModel updated successfully',
            data: updatedMachineModels,
        });
    } catch (err) {
        next(err);
    }
};

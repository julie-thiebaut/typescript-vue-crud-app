import {
    MachineModel,
    MachineModelAddAttributes,
    MachineModelInstance,
} from '../models/machinemodel';
import QueryString from 'qs';
import { MachineType } from '../models/machinetype';

export async function create({
    name,
    machineTypeId,
}: MachineModelAddAttributes): Promise<MachineModelInstance | null> {
    try {
        return MachineModel.create({ name, machineTypeId });
    } catch (error) {
        throw error;
    }
}

export async function update(
    { name, machineTypeId }: MachineModelAddAttributes,
    id: number,
): Promise<[affectedCount: number]> {
    try {
        return await MachineModel.update(
            { name, machineTypeId },
            { where: { id } },
        );
    } catch (error) {
        throw error;
    }
}

export async function getById(
    id: number,
): Promise<MachineModelInstance | null> {
    try {
        return await MachineModel.findByPk(id);
    } catch (error) {
        throw error;
    }
}

export async function remove(id: number): Promise<number> {
    try {
        return await MachineModel.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getAll(
    query: QueryString.ParsedQs,
): Promise<MachineModelInstance[]> {
    try {
        let typeCondition = {};
        const type = query.type;
        if (type) {
            typeCondition = { name: type };
        }
        let modelCondition = {};
        const model = query.model;
        if (model) {
            modelCondition = { name: model };
        }
        const machinemodels = await MachineModel.findAll({
            where: modelCondition,
            include: {
                model: MachineType,
                as: 'type',
                where: typeCondition,
                required: true,
            },
        });
        return machinemodels;
    } catch (error) {
        throw error;
    }
}

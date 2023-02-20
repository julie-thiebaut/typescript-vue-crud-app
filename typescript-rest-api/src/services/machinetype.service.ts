import {
    MachineType,
    MachineTypeAddAttributes,
    MachineTypeInstance,
} from '../models/machinetype';
import QueryString from 'qs';

export async function create({
    name,
}: MachineTypeAddAttributes): Promise<MachineTypeInstance | null> {
    try {
        return MachineType.create({ name });
    } catch (error) {
        throw error;
    }
}

export async function update(
    { name }: MachineTypeAddAttributes,
    id: number,
): Promise<[affectedCount: number]> {
    try {
        return await MachineType.update({ name }, { where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getById(id: number): Promise<MachineTypeInstance | null> {
    try {
        return await MachineType.findByPk(id);
    } catch (error) {
        throw error;
    }
}

export async function remove(id: number): Promise<number> {
    try {
        return await MachineType.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getAll(
    query: QueryString.ParsedQs,
): Promise<MachineTypeInstance[]> {
    try {
        let typeCondition = {};
        const type = query.type;
        if (type) {
            typeCondition = { name: type };
        }
        return await MachineType.findAll({
            where: typeCondition,
        });
    } catch (error) {
        throw error;
    }
}

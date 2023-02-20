import QueryString from 'qs';
import { Connection } from '../models/connection';
import {
    Machine,
    MachineAddAttributes,
    MachineInstance,
} from '../models/machine';
import { MachineModel } from '../models/machinemodel';
import { MachineType } from '../models/machinetype';

export async function create({
    mac,
    state,
}: MachineAddAttributes): Promise<MachineInstance | null> {
    try {
        return Machine.create({ mac, state });
    } catch (error) {
        throw error;
    }
}

export async function update(
    { mac, state }: MachineAddAttributes,
    id: number,
): Promise<[affectedCount: number]> {
    try {
        const original = await Machine.findByPk(id);
        if (
            original &&
            original.state === 'installed' &&
            state !== 'installed'
        ) {
            await Connection.destroy({ where: { machineId: id } });
            await Connection.destroy({ where: { connectedToMachineId: id } });
        }
        return await Machine.update({ mac, state }, { where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getById(id: number): Promise<MachineInstance | null> {
    try {
        return await Machine.findByPk(id);
    } catch (error) {
        throw error;
    }
}

export { getById as getMachineById };

export async function remove(id: number): Promise<number> {
    try {
        return await Machine.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getAll(
    query: QueryString.ParsedQs,
): Promise<MachineInstance[]> {
    try {
        let machineCondition = {};
        const mac = query.mac;
        if (mac) {
            machineCondition = { mac };
        }
        const state = query.state;
        if (state) {
            machineCondition = { state };
        }
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
        const machines = await Machine.findAll({
            where: machineCondition,
            include: [
                {
                    model: Connection,
                    include: [
                        {
                            model: Machine,
                            as: 'connectedToMachine',
                        },
                        {
                            model: Machine,
                            as: 'machine',
                        },
                    ],
                    as: 'connections',
                },
                {
                    model: MachineModel,
                    include: [
                        {
                            model: MachineType,
                            as: 'type',
                            where: typeCondition,
                            required: true,
                        },
                    ],
                    as: 'model',
                    where: modelCondition,
                    required: true,
                },
            ],
        });
        return machines;
    } catch (error) {
        throw error;
    }
}

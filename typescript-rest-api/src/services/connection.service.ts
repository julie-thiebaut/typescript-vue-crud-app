import { Op } from 'sequelize';
import QueryString from 'qs';
import {
    Connection,
    ConnectionAddAttributes,
    ConnectionInstance,
} from '../models/connection';
import { Machine } from '../models/machine';
import { MachineModel } from '../models/machinemodel';
import { MachineType } from '../models/machinetype';

export async function create({
    machineId,
    connectedToMachineId,
}: ConnectionAddAttributes): Promise<ConnectionInstance | null> {
    try {
        await Connection.create({
            machineId,
            connectedToMachineId,
            startDate: new Date(),
        });
        return Connection.create({
            machineId: connectedToMachineId,
            connectedToMachineId: machineId,
            startDate: new Date(),
        });
    } catch (error) {
        throw error;
    }
}

export async function update(
    { machineId, connectedToMachineId }: ConnectionAddAttributes,
    id: number,
): Promise<[affectedCount: number]> {
    try {
        await Connection.update(
            {
                machineId: connectedToMachineId,
                connectedToMachineId: machineId,
            },
            {
                where: {
                    machineId: connectedToMachineId,
                    connectedToMachineId: machineId,
                },
            },
        );
        return await Connection.update(
            { machineId, connectedToMachineId },
            { where: { id } },
        );
    } catch (error) {
        throw error;
    }
}

export async function getById(id: number): Promise<ConnectionInstance | null> {
    try {
        return await Connection.findByPk(id);
    } catch (error) {
        throw error;
    }
}

export async function remove(id: number): Promise<number> {
    try {
        return await Connection.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

export async function getAll(
    query: QueryString.ParsedQs,
): Promise<ConnectionInstance[]> {
    try {
        let fromDateCondition = {};
        const startDate = query.startDate;
        const endDate = query.endDate;
        if (startDate && endDate) {
            fromDateCondition = {
                startDate: {
                    [Op.between]: [startDate, endDate],
                },
            };
        }
        let machineCondition = {};
        const machineId = query.machineId;
        if (machineId) {
            machineCondition = { id: machineId };
        }

        const connections = await Connection.findAll({
            where: fromDateCondition,
            include: [
                {
                    model: Machine,
                    include: [
                        {
                            model: MachineModel,
                            as: 'model',
                            include: [
                                {
                                    model: MachineType,
                                    as: 'type',
                                },
                            ],
                        },
                    ],
                    as: 'connectedToMachine',
                },
                {
                    model: Machine,
                    include: [
                        {
                            model: MachineModel,
                            as: 'model',
                            include: [
                                {
                                    model: MachineType,
                                    as: 'type',
                                },
                            ],
                        },
                    ],
                    where: machineCondition,
                    required: true,
                    as: 'machine',
                },
            ],
        });
        return connections;
    } catch (error) {
        throw error;
    }
}

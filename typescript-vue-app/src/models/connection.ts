import { Machine } from "./machine";

export interface Connection {
    id: number;
    machineId: number;
    machine: Machine;
    connectedToMachineId: number;
    connectedToMachine: Machine;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ConnectionAddAttributes {
    machineId: number;
    connectedToMachineId: number;
    startDate: Date;
    endDate?: Date;
}
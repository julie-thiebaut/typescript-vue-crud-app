import { MachineType } from "./machinetype";

export interface MachineModel {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    machineTypeId: number;
    type: MachineType;
}

export interface MachineModelAddAttributes {
    name: string;
    machineTypeId: number;
}
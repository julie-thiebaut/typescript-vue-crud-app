import { Connection } from "./connection";
import { MachineModel } from "./machinemodel";

export interface Machine {
    id: number;
    mac: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    machineModelId: number;
    connections: Connection[];
    model: MachineModel;
}

export interface MachineAddAttributes {
    mac: string;
    state: string;
}




export interface MachineType {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MachineTypeAddAttributes {
    name: string;
}
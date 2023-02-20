import { sequelize, Sequelize } from '.';
import { Model, DataTypes, Optional } from 'sequelize';

type MachineState = 'stock' | 'maintenance' | 'installed';

export interface MachineAttributes {
    id: number;
    mac: string;
    state: MachineState;
}

export interface MachineAddAttributes {
    mac: string;
    state: MachineState;
}

export interface MachineCreationAttributes
    extends Optional<MachineAttributes, 'id'> {}

export interface MachineInstance
    extends Model<MachineAttributes, MachineCreationAttributes>,
        MachineAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Machine = sequelize.define<MachineInstance>('machine', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    mac: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

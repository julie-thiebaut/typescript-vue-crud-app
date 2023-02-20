import { sequelize, Sequelize } from '.';
import { Model, DataTypes, Optional, UUID, UUIDV4 } from 'sequelize';

export interface MachineTypeAttributes {
    id: number;
    name: string;
}

export interface MachineTypeAddAttributes {
    name: string;
}

export interface MachineTypeCreationAttributes
    extends Optional<MachineTypeAttributes, 'id'> {}

export interface MachineTypeInstance
    extends Model<MachineTypeAttributes, MachineTypeCreationAttributes>,
        MachineTypeAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const MachineType = sequelize.define<MachineTypeInstance>(
    'machinetype',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
);

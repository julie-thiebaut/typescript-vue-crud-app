import { sequelize, Sequelize } from '.';
import { Model, DataTypes, Optional, UUID, UUIDV4 } from 'sequelize';
import { Machine } from './machine';
import { MachineType } from './machinetype';
import { Connection } from './connection';

export interface MachineModelAttributes {
    id: number;
    name: string;
    machineTypeId: number;
}

export interface MachineModelAddAttributes {
    name: string;
    machineTypeId: number;
}

export interface MachineModelCreationAttributes
    extends Optional<MachineModelAttributes, 'id'> {}

export interface MachineModelInstance
    extends Model<MachineModelAttributes, MachineModelCreationAttributes>,
        MachineModelAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const MachineModel = sequelize.define<MachineModelInstance>(
    'machinemodel',
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
        machineTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'MachineTypes',
                key: 'id',
            },
        },
    },
);

Machine.belongsTo(MachineModel, {
    foreignKey: 'machineModelId',
    as: 'model',
});
MachineModel.hasMany(Machine, {
    sourceKey: 'id',
    foreignKey: 'machineModelId',
    as: 'machines',
});
MachineModel.belongsTo(MachineType, {
    foreignKey: 'machineTypeId',
    as: 'type',
});
MachineType.hasMany(MachineModel, {
    sourceKey: 'id',
    foreignKey: 'machineTypeId',
    as: 'models',
});
Machine.hasMany(Connection, {
    sourceKey: 'id',
    foreignKey: 'machineId',
    as: 'connections',
});
Connection.belongsTo(Machine, {
    foreignKey: 'connectedToMachineId',
    as: 'connectedToMachine',
});
Connection.belongsTo(Machine, {
    foreignKey: 'machineId',
    as: 'machine',
});

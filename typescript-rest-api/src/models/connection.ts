import { sequelize, Sequelize } from '.';
import { Model, DataTypes, Optional, UUID, UUIDV4 } from 'sequelize';

export interface ConnectionAttributes {
    id: number;
    machineId: number;
    connectedToMachineId: number;
    startDate: Date;
    endDate: Date | undefined;
}

export interface ConnectionAddAttributes {
    machineId: number;
    connectedToMachineId: number;
    startDate: Date;
    endDate: Date | undefined;
}

export interface ConnectionCreationAttributes
    extends Optional<ConnectionAttributes, 'id'> {}

export interface ConnectionInstance
    extends Model<ConnectionAttributes, ConnectionCreationAttributes>,
        ConnectionAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Connection = sequelize.define<ConnectionInstance>('connection', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    machineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Machines',
            key: 'id',
        },
    },
    connectedToMachineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Machines',
            key: 'id',
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

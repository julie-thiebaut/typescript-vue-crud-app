import { sequelize, Sequelize } from '.';
import { Model, DataTypes, Optional, UUID, UUIDV4 } from 'sequelize';

export interface UserAttributes {
    id: string;
    email: string;
    password: string;
}

export interface UserAddAttributes {
    email: string;
    password: string;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const User = sequelize.define<UserInstance>('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

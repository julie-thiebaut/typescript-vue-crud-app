import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
};

const sequelize = new Sequelize(
    config.dialect +
        '://' +
        config.username +
        ':' +
        config.password +
        '@' +
        config.host +
        '/' +
        config.database,
);

export { Sequelize, sequelize };

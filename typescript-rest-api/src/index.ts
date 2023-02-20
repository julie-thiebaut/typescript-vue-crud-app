import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';
import connectionRouter from './routers/connection.router';
import machineRouter from './routers/machine.router';
import machineTypeRouter from './routers/machinetype.router';
import machineModelRouter from './routers/machinemodel.router';
import { auth } from './middlewares/auth.middleware.ts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const allowedOrigins = ['http://localhost:8081'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(options));
app.use('/machine-types', auth, machineTypeRouter);
app.use('/machine-models', auth, machineModelRouter);
app.use('/machines', auth, machineRouter);
app.use('/connections', auth, connectionRouter);
app.use('/users', auth, userRouter);
app.use('/', authRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

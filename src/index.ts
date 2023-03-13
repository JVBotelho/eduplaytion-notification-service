import express, { Application, Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import dbConfig from './database';
import notificationsRouter from "./routes/notifications/notifications.routes";
import {errorHandlerMiddleware} from "./middleware/error-handler.middleware";
import {config} from "./config";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/notifications', notificationsRouter);

// Error handler middleware
app.use(errorHandlerMiddleware);

// Start the server
const PORT: number = config.DB_PORT || 3000;

createConnection(dbConfig)
    .then(() => {
        console.log(`Database connected successfully.`);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => console.log(`Error connecting to the database: ${err}`));

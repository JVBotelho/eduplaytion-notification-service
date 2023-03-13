import express from 'express';
import { json } from 'body-parser';
import {errorHandlerMiddleware} from './middleware/error-handler.middleware';
import notificationsRouter from "./routes/notifications/notifications.routes";

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerDef');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(json());

app.use('/api/notifications', notificationsRouter);

app.use(errorHandlerMiddleware);

export default app;

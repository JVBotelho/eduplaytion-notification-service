import { Router } from 'express';
import notificationsRouter from './notifications/notifications.routes';

const router = Router();

router.use('/api/notifications', notificationsRouter);

export default router;
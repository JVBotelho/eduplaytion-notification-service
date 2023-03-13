import { Router } from 'express';
import {NotificationsController} from "../../controllers/Notifications/notifications.controller";

const notificationsRouter = Router();

notificationsRouter.get('/', NotificationsController.getNotifications);
notificationsRouter.get('/unread', NotificationsController.getUnreadNotifications);
notificationsRouter.get('/unread/count', NotificationsController.getUnreadNotificationsCount);
notificationsRouter.get('/read', NotificationsController.getReadNotifications);
notificationsRouter.get('/read/count', NotificationsController.getReadNotificationsCount);
notificationsRouter.get('/:id', NotificationsController.getNotificationById);
notificationsRouter.put('/:id/read', NotificationsController.markNotificationAsRead);
notificationsRouter.put('/:id/unread', NotificationsController.markNotificationAsUnread);
notificationsRouter.get('/user/:userId', NotificationsController.getNotificationsByUserId);

export default notificationsRouter;

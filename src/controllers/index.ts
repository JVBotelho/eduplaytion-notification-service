import { Router } from 'express';
import {NotificationsController} from "./Notifications/notifications.controller";

const router = Router();

// Notifications routes
router.get('/notifications', NotificationsController.getNotifications);
router.get('/notifications/unread', NotificationsController.getUnreadNotifications);
router.get('/notifications/unread/count', NotificationsController.getUnreadNotificationsCount);
router.get('/notifications/read', NotificationsController.getReadNotifications);
router.get('/notifications/read/count', NotificationsController.getReadNotificationsCount);
router.put('/notifications/:id/read', NotificationsController.markNotificationAsRead);
router.put('/notifications/:id/unread', NotificationsController.markNotificationAsUnread);
router.get('/notifications/:id', NotificationsController.getNotificationById);

export default router;
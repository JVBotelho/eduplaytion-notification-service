import { Request, Response, NextFunction } from 'express';
import {getRepository, SelectQueryBuilder} from 'typeorm';
import { NotificationEntity } from '../../entities/notification.entity';

export class NotificationsController {
    public static async getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notifications = await getRepository(NotificationEntity).find({});
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    public static async getUnreadNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notifications = await getRepository(NotificationEntity).find({ where: { read: false } });
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    public static async getUnreadNotificationsCount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const count = await getRepository(NotificationEntity).count({ where: { read: false } });
            res.json(count);
        } catch (error) {
            next(error);
        }
    }


    public static async getReadNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notifications = await getRepository(NotificationEntity).find({ where: { read: true } });
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    public static async getReadNotificationsCount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const options = { where: { read: true } };
            const count = await getRepository(NotificationEntity).count(options);
            res.json(count);
        } catch (error) {
            next(error);
        }
    }

    public static async markNotificationAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const notificationRepo = getRepository(NotificationEntity);
            const notification = await notificationRepo.findOne({ where: { id } });
            if (!notification) {
                res.status(404).send('NotificationEntity not found');
                return;
            }
            notification.read = true;
            await notificationRepo.save(notification);
            res.status(200).send('NotificationEntity marked as read');
        } catch (error) {
            next(error);
        }
    }

    public static async markNotificationAsUnread(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const notificationRepo = getRepository(NotificationEntity);
            const notification = await notificationRepo.findOne({ where: { id } });
            if (!notification) {
                res.status(404).send('NotificationEntity not found');
                return;
            }
            notification.read = false;
            await notificationRepo.save(notification);
            res.status(200).send('NotificationEntity marked as unread');
        } catch (error) {
            next(error);
        }
    }

    public static async getNotificationById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const notificationRepo = getRepository(NotificationEntity);
            const notification = await notificationRepo.findOne({
                where: {
                    id,
                },
                relations: {
                    user: true,
                },
            });
            if (!notification) {
                res.status(404).send('NotificationEntity not found');
                return;
            }
            res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    public static async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notificationRepo = getRepository(NotificationEntity);
            const newNotification = notificationRepo.create(req.body);
            const savedNotification = notificationRepo.save(newNotification);
            res.status(201).json(savedNotification);
        } catch (error) {
            next(error);
        }
    }

    public static async updateNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const notificationRepo = getRepository(NotificationEntity);
            const notification = await notificationRepo.findOne({ where: { id } });
            if (!notification) {
                res.status(404).send('NotificationEntity not found');
                return;
            }
            notificationRepo.merge(notification, req.body);
            const updatedNotification = await notificationRepo.save(notification);
            res.json(updatedNotification);
        } catch (error) {
            next(error);
        }
    }

    public static async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const notificationRepo = getRepository(NotificationEntity);
            const notification = await notificationRepo.findOne({ where: { id } });
            if (!notification) {
                res.status(404).send('NotificationEntity not found');
                return;
            }
            await notificationRepo.remove(notification);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    public static async getNotificationsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const notificationRepo = getRepository(NotificationEntity);
            const notifications = await notificationRepo
                .createQueryBuilder('notification')
                .innerJoinAndSelect('notification.user', 'user')
                .where('user.id = :id', { id: userId })
                .getMany();
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    }
}

import { EntityRepository, Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
    public async findByUserId(userId: string): Promise<NotificationEntity[]> {
        return await this.createQueryBuilder('notification')
            .innerJoinAndSelect('notification.user', 'user')
            .where('user.id = :id', { id: userId })
            .getMany();
    }
}

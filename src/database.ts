import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { NotificationEntity } from './entities/notification.entity';
import { UserEntity } from './entities/user.entity';
import {config} from "./config";

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: [NotificationEntity, UserEntity],
    synchronize: false,
    logging: false,
    migrations: [],
};

export default dbConfig;

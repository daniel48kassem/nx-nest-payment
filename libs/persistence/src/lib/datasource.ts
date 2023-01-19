import {config} from 'dotenv';

config();

import {DataSource, DataSourceOptions} from 'typeorm';

import {ENTITIES} from './entities';

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ENTITIES,
  migrations: ['libs/persistence/src/lib/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  synchronize: false,
};

export default new DataSource(DATA_SOURCE_OPTIONS);

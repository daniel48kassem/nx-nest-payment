import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {BaseEntity, DatabaseType} from 'typeorm';

import {ENTITIES} from "./lib";


export interface DatabaseConfig {
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  entities?: BaseEntity[];
  schema?: string;
  type?: DatabaseType;
  autoSave?: boolean;
  logging?: boolean;
  synchronize?: true;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<DatabaseConfig>('database');

    return {
      type: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      database: databaseConfig.database,
      username: databaseConfig.username,
      password: databaseConfig.password,
      entities: ENTITIES,
      autoLoadEntities: true,
      synchronize: true,
      // migrations: ['dist/libs/persistence/src/lib/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      logging: true,
    };
  }
}

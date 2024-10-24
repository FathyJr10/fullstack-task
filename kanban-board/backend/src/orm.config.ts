import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: '0000',
  port: 5432,
  host: '127.0.0.1',
  database: 'fullstack-db',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

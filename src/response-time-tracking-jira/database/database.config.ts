import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Shard@123!!',
    database: 'carestack_pms',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
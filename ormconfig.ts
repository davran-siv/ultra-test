// This file needs for TypeORM CLI like running/reverting migrations

import { SnakeNamingStrategy } from './src/shared/repositry/snake-naming-steategy';

const type: any = 'postgres';
const typeormConfig = {
  type,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: false,
  uuidExtension: 'uuid-ossp',
  cli: {
    migrationsDir: 'migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
// export default breaks migrations https://github.com/typeorm/typeorm/issues/5003
export = typeormConfig;

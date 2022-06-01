import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from './src/shared/repositry/snake-naming-steategy/snake-naming-steategy';

const typeormConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
});

export default typeormConfig;

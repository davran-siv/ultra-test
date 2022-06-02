import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './src/config/env.validation';
import { GamesEntity } from './src/modules/games/games.entity';
import { SnakeNamingStrategy } from './src/shared/repositry/snake-naming-steategy/snake-naming-steategy';

const type: any = 'postgres';

const typeormConfigAsync = (
  config: ConfigService<EnvironmentVariables, true>,
) => ({
  type,
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

export default typeormConfigAsync;

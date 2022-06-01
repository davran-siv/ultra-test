import { ConfigService } from '@nestjs/config'
import { SnakeNamingStrategy } from './src/shared/repository/snake-naming-steategy'
import { TypeOrmLoggerContainer } from './src/shared/repository/type-orm-logger-container'

// This file needs for NestJS
const type: any = 'postgres'

const typeormConfigAsync = (config: ConfigService) => ({
  type,
  host: config.get('PG_HOST'),
  port: config.get('PG_PORT'),
  username: config.get('PG_USER'),
  password: config.get('PG_PASSWORD'),
  database: config.get('PG_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
  uuidExtension: 'uuid-ossp',
  cli: {
    migrationsDir: 'migrations',
  },
  logger: TypeOrmLoggerContainer.ForConnection(
    'default',
    ['error'],
  ),
  namingStrategy: new SnakeNamingStrategy(),
})

export default typeormConfigAsync

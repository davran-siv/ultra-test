import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/env.validation';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const configService =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(configService.get('SERVICE_PORT'));
  logger.log(
    `App successfully started on port: ${configService.get('SERVICE_PORT')}`,
  );
}
bootstrap();

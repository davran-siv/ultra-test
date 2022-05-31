import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Modules } from './modules/modules';

@Module({
  imports: [Modules],
  controllers: [AppController],
})
export class AppModule {}

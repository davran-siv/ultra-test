import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { Modules } from './modules/modules';

@Module({
  imports: [Modules, EventEmitterModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}

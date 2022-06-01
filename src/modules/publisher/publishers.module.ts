import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersEntity } from './publishers.entity';
import { PublishersRepository } from './publishers.repository';
import { PublishersQueryService } from './services/publishers-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublishersEntity])],
  providers: [PublishersQueryService, PublishersRepository],
  exports: [PublishersQueryService],
})
export class PublishersModule {}

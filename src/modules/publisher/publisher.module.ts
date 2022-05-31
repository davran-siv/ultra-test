import { Module } from '@nestjs/common';
import { PublisherRepository } from './publisher.repository';
import { PublisherQueryService } from './services/publisher-query.service';

@Module({
  providers: [PublisherQueryService, PublisherRepository],
  exports: [PublisherQueryService],
})
export class PublisherModule {}

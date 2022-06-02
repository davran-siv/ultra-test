import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersModule } from '../publisher/publishers.module';
import { GamesEntity } from './games.entity';
import { GamesRepository } from './games.repository';
import { GamesApplyDiscountService } from './services/games-apply-discount/games-apply-discount.service';
import { GamesDeleteOutdatedService } from './services/games-delete-outdated/games-delete-outdated.service';
import { GamesMutationService } from './services/games-mutation/games-mutation.service';
import { GamesQueryService } from './services/games-query/games-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([GamesEntity]), PublishersModule],
  providers: [
    GamesMutationService,
    GamesQueryService,
    GamesRepository,
    GamesDeleteOutdatedService,
    GamesApplyDiscountService,
  ],
  exports: [
    GamesMutationService,
    GamesQueryService,
    GamesDeleteOutdatedService,
    GamesApplyDiscountService,
  ],
})
export class GamesModule {}

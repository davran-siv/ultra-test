import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GamesApplyDiscountService } from '../../services/games-apply-discount/games-apply-discount.service';
import { GamesDeleteOutdatedService } from '../../services/games-delete-outdated/games-delete-outdated.service';
import { GameUpdatedEvent } from '../event/game-updated.event';

@Injectable()
export class GameUpdatedHandler {
  private readonly logger = new Logger(GameUpdatedHandler.name);
  constructor(
    private readonly gamesDeleteOutdatedService: GamesDeleteOutdatedService,
    private readonly gamesApplyDiscountService: GamesApplyDiscountService,
  ) {}

  @OnEvent(GameUpdatedEvent.name)
  async checkIfGameShouldBeDeletedAfterUpdate(payload: GameUpdatedEvent) {
    this.logger.log(
      `[checkIfGameShouldBeDeletedAfterUpdate] Got event with payload: ${JSON.stringify(
        payload,
      )}`,
    );
    try {
      await this.gamesDeleteOutdatedService.findAndDelete([payload.id]);
      this.logger.log(
        '[checkIfGameShouldBeDeletedAfterUpdate] Successfully handler event',
      );
    } catch (error) {
      this.logger.error(
        `[checkIfGameShouldBeDeletedAfterUpdate] Failed to handler event. Error: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }

  @OnEvent(GameUpdatedEvent.name)
  async checkIfDiscountShouldBeAppliedAfterUpdate(payload: GameUpdatedEvent) {
    this.logger.log(
      `[checkIfDiscountShouldBeAppliedAfterUpdate] Got event with payload: ${JSON.stringify(
        payload,
      )}`,
    );
    try {
      await this.gamesApplyDiscountService.addDiscountToExpiringGames([
        payload.id,
      ]);

      this.logger.log(
        '[checkIfDiscountShouldBeAppliedAfterUpdate] Successfully handler event',
      );
    } catch (error) {
      this.logger.error(
        `[checkIfDiscountShouldBeAppliedAfterUpdate] Failed to handler event. Error: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }
}

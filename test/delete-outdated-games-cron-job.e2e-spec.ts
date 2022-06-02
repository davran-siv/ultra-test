import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { DeleteOutdatedGamesCronJob } from '../src/crons/delete-outdated-games/delete-outdated-games.cron-job';
import { dateBeforeMonths } from '../src/shared/utils/date-before/date-before.util';
import { GameSeedManager, gameSeedManager } from './seeds/game.seed';
import {
  PublisherSeedManager,
  publisherSeedManager,
} from './seeds/publisher.seed';

describe('DeleteOutdatedGamesCronJob (e2e)', () => {
  let connectionManager;
  let publisherSeeder: PublisherSeedManager;
  let gameSeeder: GameSeedManager;
  let deleteOutdatedGamesCronJob: DeleteOutdatedGamesCronJob;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EventEmitter2)
      .useValue({ emit: jest.fn() })
      .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    deleteOutdatedGamesCronJob = moduleFixture.get(DeleteOutdatedGamesCronJob);
    const connection = app.get(Connection);
    connectionManager = connection.manager;

    publisherSeeder = publisherSeedManager(connectionManager);
    gameSeeder = gameSeedManager(connectionManager);
  });

  it('should delete an outdated game. REMOVE_GAMES_PUBLISHED_MORE_THAN_MONTHS_AGO should be 18 or lower', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateBeforeMonths(19),
    });

    await deleteOutdatedGamesCronJob.run();
    const { deleted_at } = await gameSeeder.findById(id);
    expect(deleted_at).not.toBeNull();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('should not delete a game. REMOVE_GAMES_PUBLISHED_MORE_THAN_MONTHS_AGO should be 18 or higher', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateBeforeMonths(17),
    });

    await deleteOutdatedGamesCronJob.run();
    const { deleted_at } = await gameSeeder.findById(id);
    expect(deleted_at).toBeNull();
    await publisherSeeder.deleteById(publisher.id);
  });
});

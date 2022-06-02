import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ApplyDiscountToExpiringGamesCronJob } from '../src/crons/apply-discount-to-expiring-games/apply-discount-to-expiring-games.cron-job';
import { dateAfterMonths } from '../src/shared/utils/date-after/date-after.util';
import { dateBeforeMonths } from '../src/shared/utils/date-before/date-before.util';
import { GameSeedManager, gameSeedManager } from './seeds/game.seed';
import {
  PublisherSeedManager,
  publisherSeedManager,
} from './seeds/publisher.seed';

describe('ApplyDiscountToExpiringGamesCronJob (e2e)', () => {
  let connectionManager;
  let publisherSeeder: PublisherSeedManager;
  let gameSeeder: GameSeedManager;
  let applyDiscountToExpiringGamesCronJob: ApplyDiscountToExpiringGamesCronJob;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EventEmitter2)
      .useValue({ emit: jest.fn() })
      .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    applyDiscountToExpiringGamesCronJob = moduleFixture.get(
      ApplyDiscountToExpiringGamesCronJob,
    );
    const connection = app.get(Connection);
    connectionManager = connection.manager;

    publisherSeeder = publisherSeedManager(connectionManager);
    gameSeeder = gameSeedManager(connectionManager);
  });

  it('should apply discount', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateBeforeMonths(13),
    });

    await applyDiscountToExpiringGamesCronJob.run();
    const { discount } = await gameSeeder.findById(id);
    expect(discount).toEqual('20.00');
    // await publisherSeeder.deleteById(publisher.id);
  });

  it('should apply discount', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateBeforeMonths(12),
      price: 100,
    });

    await applyDiscountToExpiringGamesCronJob.run();
    const { discount } = await gameSeeder.findById(id);
    expect(discount).toEqual('20.00');
    await publisherSeeder.deleteById(publisher.id);
  });

  it('should not apply discount. released before range', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateBeforeMonths(11),
      price: 100,
    });

    await applyDiscountToExpiringGamesCronJob.run();
    const { discount } = await gameSeeder.findById(id);
    expect(discount).toBeNull();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('should not apply discount. release_date after range', async () => {
    const publisher = await publisherSeeder.create();

    const { id } = await gameSeeder.create({
      publisherId: publisher.id,
      release_date: dateAfterMonths(18),
      price: 100,
    });

    await applyDiscountToExpiringGamesCronJob.run();
    const { discount } = await gameSeeder.findById(id);
    expect(discount).toBeNull();
    await publisherSeeder.deleteById(publisher.id);
  });
});

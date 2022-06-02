import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { dateAfterMonths } from '../src/shared/utils/date-after/date-after.util';
import { GameSeedManager, gameSeedManager } from './seeds/game.seed';
import {
  PublisherSeedManager,
  publisherSeedManager,
} from './seeds/publisher.seed';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connectionManager;
  let publisherSeeder: PublisherSeedManager;
  let gameSeeder: GameSeedManager;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EventEmitter2)
      .useValue({ emit: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const connection = app.get(Connection);
    connectionManager = connection.manager;

    publisherSeeder = publisherSeedManager(connectionManager);
    gameSeeder = gameSeedManager(connectionManager);
  });

  it('/ (POST)', async () => {
    const publisher = await publisherSeeder.create();

    const gameStub = {
      title: '11',
      price: 11.11,
      publisherId: publisher.id,
      tags: ['foo', 'bar'],
      releaseDate: dateAfterMonths(1),
    };
    const { body } = await request(app.getHttpServer())
      .post('')
      .send(gameStub)
      .expect(201);

    expect(body.id).toBeDefined();
    expect(body.title).toEqual(gameStub.title);
    expect(body.price).toEqual(gameStub.price);
    expect(body.discount).toBeNull();
    expect(body.publisherId).toEqual(gameStub.publisherId);
    expect(body.tags).toEqual(gameStub.tags);
    expect(body.releaseDate).toBeDefined();
    expect(body.deletedAt).toBeDefined();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('/:id (PUT)', async () => {
    const publisher = await publisherSeeder.create();

    const gameStub = {
      title: 'updated title',
    };
    const { id } = await gameSeeder.create({ publisherId: publisher.id });

    const { body } = await request(app.getHttpServer())
      .put(`/${id}`)
      .send(gameStub)
      .expect(200);

    expect(body.id).toBeDefined();
    expect(body.title).toEqual(gameStub.title);
    expect(body.price).toBeDefined();
    expect(body.discount).toBeDefined();
    expect(body.publisherId).toBeDefined();
    expect(body.tags).toBeDefined();
    expect(body.releaseDate).toBeDefined();
    expect(body.deletedAt).toBeDefined();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('/:id (GET)', async () => {
    const publisher = await publisherSeeder.create();
    const { id } = await gameSeeder.create({ publisherId: publisher.id });

    const { body } = await request(app.getHttpServer())
      .get(`/${id}`)
      .expect(200);

    expect(body.id).toBeDefined();
    expect(body.title).toBeDefined();
    expect(body.price).toBeDefined();
    expect(body.discount).toBeDefined();
    expect(body.publisherId).toBeDefined();
    expect(body.tags).toBeDefined();
    expect(body.releaseDate).toBeDefined();
    expect(body.deletedAt).toBeDefined();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('/ (GET)', async () => {
    const publisher = await publisherSeeder.create();
    await gameSeeder.create({ publisherId: publisher.id });
    const { id } = await gameSeeder.create({ publisherId: publisher.id });
    await gameSeeder.softDeleteOneById(id);

    const { body } = await request(app.getHttpServer()).get('').expect(200);

    expect(body.items).toBeDefined();
    expect(body.totalCount).toBeDefined();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('/:id/publisher (GET)', async () => {
    const publisher = await publisherSeeder.create();
    const { id } = await gameSeeder.create({ publisherId: publisher.id });

    const { body } = await request(app.getHttpServer())
      .get(`/${id}/publisher`)
      .expect(200);

    expect(body.id).toBeDefined();
    expect(body.name).toBeDefined();
    expect(body.siret).toBeDefined();
    expect(body.phone).toBeDefined();
    expect(body.deletedAt).toBeDefined();
    await publisherSeeder.deleteById(publisher.id);
  });

  it('/:id (DELETE)', async () => {
    const publisher = await publisherSeeder.create();
    const { id } = await gameSeeder.create({ publisherId: publisher.id });

    await request(app.getHttpServer()).delete(`/${id}`).expect(200);
    const { deleted_at } = await gameSeeder.findById(id);
    expect(deleted_at).not.toBeNull();
    await publisherSeeder.deleteById(publisher.id);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './modules/games/games.controller';
import { GamesService } from './modules/games/games.service';

describe('AppController', () => {
  let appController: GamesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile();

    appController = app.get<GamesController>(GamesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';
import { GamesDeleteOutdatedService } from './games-delete-outdated.service';

describe('GamesMutationService', () => {
  let gamesDeleteOutdatedService: GamesDeleteOutdatedService;
  const deleteManyByIdsMock = jest.fn();
  const findAllMock = jest.fn();
  const getConfigMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GamesDeleteOutdatedService, GamesRepository, ConfigService],
    })
      .overrideProvider(GamesRepository)
      .useValue({
        deleteManyByIds: deleteManyByIdsMock,
        findAll: findAllMock,
      })
      .overrideProvider(ConfigService)
      .useValue({ get: getConfigMock })
      .compile();

    gamesDeleteOutdatedService = moduleRef.get(GamesDeleteOutdatedService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAndDelete', () => {
    it('should find and delete outdated games', async () => {
      jest
        .spyOn(gamesDeleteOutdatedService, 'getOutdatedGames')
        .mockResolvedValueOnce([{ id: 1 }] as GameResponseDto[]);

      await gamesDeleteOutdatedService.findAndDelete();
      expect(gamesDeleteOutdatedService.getOutdatedGames).toBeCalledTimes(1);
      expect(deleteManyByIdsMock).toBeCalledTimes(1);
    });

    it('should not find games to delete', async () => {
      jest
        .spyOn(gamesDeleteOutdatedService, 'getOutdatedGames')
        .mockResolvedValueOnce([]);

      await gamesDeleteOutdatedService.findAndDelete();
      expect(gamesDeleteOutdatedService.getOutdatedGames).toBeCalledTimes(1);
      expect(deleteManyByIdsMock).toBeCalledTimes(0);
    });
  });

  describe('getOutdatedGames', () => {
    it('should find and return games', async () => {
      const gamesStub = [{ id: 1 }];
      getConfigMock.mockReturnValueOnce(18);
      findAllMock.mockReturnValueOnce(gamesStub);
      const outdatedGames = await gamesDeleteOutdatedService.getOutdatedGames();
      expect(getConfigMock).toBeCalledTimes(1);
      expect(findAllMock).toBeCalledTimes(1);
      expect(gamesStub).toEqual(outdatedGames);
    });
  });
});

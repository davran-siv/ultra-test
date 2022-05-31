import { Test } from '@nestjs/testing';
import { GamesRepository } from '../../games.repository';
import { GamesQueryService } from '../games-query/games-query.service';
import { GamesMutationService } from './games-mutation.service';

describe('GamesMutationService', () => {
  let gamesMutationService: GamesMutationService;
  const createOneMock = jest.fn();
  const updateOneMock = jest.fn();
  const deleteOneByIdMock = jest.fn();
  const getOneByIdMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GamesQueryService, GamesRepository, GamesMutationService],
    })
      .overrideProvider(GamesRepository)
      .useValue({
        createOne: createOneMock,
        updateOne: updateOneMock,
        deleteOneById: deleteOneByIdMock,
      })
      .overrideProvider(GamesQueryService)
      .useValue({ getOneById: getOneByIdMock })
      .compile();

    gamesMutationService = moduleRef.get(GamesMutationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOne', () => {
    it('should create and return created game', async () => {
      const gameToCreate = {
        title: 'title',
        price: 1,
        publisherId: 1,
        tags: ['foo', 'bar'],
        releaseDate: new Date(),
      };
      getOneByIdMock.mockResolvedValueOnce({ id: 1, ...gameToCreate });
      createOneMock.mockResolvedValueOnce({ id: 1 });

      const game = await gamesMutationService.createOne(gameToCreate);
      expect(createOneMock).toBeCalledTimes(1);
      expect(getOneByIdMock).toBeCalledTimes(1);
      expect(game).toEqual({ id: 1, ...gameToCreate });
    });
  });

  describe('updateOne', () => {
    it('should update and return updated game', async () => {
      const gameToUpdate = {
        title: 'title',
        price: 1,
        publisherId: 1,
        tags: ['foo', 'bar'],
        releaseDate: new Date(),
      };
      const gameId = 1;
      getOneByIdMock.mockResolvedValueOnce({ id: gameId, ...gameToUpdate });
      updateOneMock.mockResolvedValueOnce({ id: gameId });

      const game = await gamesMutationService.updateOne(gameId, gameToUpdate);
      expect(updateOneMock).toBeCalledTimes(1);
      expect(getOneByIdMock).toBeCalledTimes(1);
      expect(game).toEqual({ id: gameId, ...gameToUpdate });
    });
  });

  describe('deleteOne', () => {
    it('should delete game', async () => {
      const gameId = 1;

      const game = await gamesMutationService.deleteOne(gameId);
      expect(deleteOneByIdMock).toBeCalledTimes(1);
      expect(game).toBeUndefined();
    });
  });
});

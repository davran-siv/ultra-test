import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';
import { GamesQueryService } from './games-query.service';

describe('GamesQueryService', () => {
  let gamesQueryService: GamesQueryService;
  const findOneByIdMock = jest.fn();
  const findAllPaginatedMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GamesQueryService, GamesRepository],
    })
      .overrideProvider(GamesRepository)
      .useValue({
        findOneById: findOneByIdMock,
        findAllPaginated: findAllPaginatedMock,
      })
      .compile();

    gamesQueryService = moduleRef.get(GamesQueryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getOneById', () => {
    it('should return game', async () => {
      jest
        .spyOn(gamesQueryService, 'findOneById')
        .mockResolvedValueOnce({ id: 1 } as GameResponseDto);

      const game = await gamesQueryService.getOneById(1);
      expect(game?.id).toBe(1);
      expect(gamesQueryService.findOneById).toBeCalledTimes(1);
    });
    it('should throw now found exception', async () => {
      jest
        .spyOn(gamesQueryService, 'findOneById')
        .mockResolvedValueOnce(undefined);

      try {
        await gamesQueryService.getOneById(1);
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(gamesQueryService.findOneById).toBeCalledTimes(1);
      }
    });
  });

  describe('findOneById', () => {
    it('should return value from repository', async () => {
      findOneByIdMock.mockResolvedValueOnce({ id: 1 });
      const game = await gamesQueryService.findOneById(1);
      expect(game?.id).toBe(1);
      expect(findOneByIdMock).toBeCalledTimes(1);
    });
  });

  describe('findAllPaginated', () => {
    it('should return paginated value from repository', async () => {
      findAllPaginatedMock.mockResolvedValueOnce({
        items: [{ id: 1 }],
        totalCount: 1,
      });

      const game = await gamesQueryService.findAllPaginated();
      expect(game?.items[0]?.id).toBe(1);
      expect(game?.totalCount).toBe(1);
      expect(findAllPaginatedMock).toBeCalledTimes(1);
    });
  });
});

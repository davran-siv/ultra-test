import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';
import { GamesApplyDiscountService } from './games-apply-discount.service';

describe('GamesApplyDiscountService', () => {
  let gamesApplyDiscountService: GamesApplyDiscountService;
  const findAllMock = jest.fn();
  const updateManyMock = jest.fn();
  const getConfigMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GamesApplyDiscountService, GamesRepository, ConfigService],
    })
      .overrideProvider(GamesRepository)
      .useValue({
        findAll: findAllMock,
        updateMany: updateManyMock,
      })
      .overrideProvider(ConfigService)
      .useValue({ get: getConfigMock })
      .compile();

    gamesApplyDiscountService = moduleRef.get(GamesApplyDiscountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addDiscountToExpiringGames', () => {
    it('should find and apply discount to expiring games', async () => {
      getConfigMock.mockReturnValueOnce(20);
      jest
        .spyOn(gamesApplyDiscountService, 'getExpiringGamesWithoutDiscount')
        .mockResolvedValueOnce([{ id: 1, price: 100 }] as GameResponseDto[]);
      await gamesApplyDiscountService.addDiscountToExpiringGames();
      expect(getConfigMock).toBeCalledTimes(1);
      expect(
        gamesApplyDiscountService.getExpiringGamesWithoutDiscount,
      ).toBeCalledTimes(1);
      expect(updateManyMock).toBeCalledTimes(1);
    });

    it('should not find expiring games', async () => {
      getConfigMock.mockReturnValueOnce(20);
      jest
        .spyOn(gamesApplyDiscountService, 'getExpiringGamesWithoutDiscount')
        .mockResolvedValueOnce([]);
      await gamesApplyDiscountService.addDiscountToExpiringGames();
      expect(getConfigMock).toBeCalledTimes(1);
      expect(
        gamesApplyDiscountService.getExpiringGamesWithoutDiscount,
      ).toBeCalledTimes(1);
      expect(updateManyMock).toBeCalledTimes(0);
    });
  });

  describe('getExpiringGames', () => {
    it('should find and return games', async () => {
      const gamesStub = [{ id: 1 }];
      getConfigMock.mockReturnValue(18);
      findAllMock.mockResolvedValueOnce(gamesStub);
      const expiringGames =
        await gamesApplyDiscountService.getExpiringGamesWithoutDiscount();
      expect(getConfigMock).toBeCalledTimes(2);
      expect(findAllMock).toBeCalledTimes(1);
      expect(expiringGames).toEqual(gamesStub);
    });
  });
});

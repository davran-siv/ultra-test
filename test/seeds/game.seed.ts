import { EntityManager } from 'typeorm';
import { dateAfterMonths } from '../../src/shared/utils/date-after/date-after.util';

interface GameRawEntity {
  id: number;
  title: string;
  price: string;
  discount: string;
  publisherId: number;
  tags: string[];
  release_date: string;
  deleted_at: string | null;
}

interface GameCreateSeed {
  publisherId: number;
  release_date?: Date;
  price?: number;
}

export interface GameSeedManager {
  create: (props: GameCreateSeed) => Promise<{ id }>;
  softDeleteOneById: (id: number) => Promise<void>;
  findById: (id: number) => Promise<GameRawEntity>;
}

const gameCreateSeed = async (
  manager: EntityManager,
  props: GameCreateSeed,
): Promise<{ id }> => {
  const [game] = await manager.query(
    `
      INSERT INTO public.games (id, title, price, publisher_id, tags, release_date)
      VALUES (DEFAULT, 'game', $1, $2, DEFAULT, $3) RETURNING id`,
    [
      props.price || 100,
      props.publisherId,
      props.release_date || dateAfterMonths(2),
    ],
  );
  return game;
};

const softDeleteOneById = async (
  manager: EntityManager,
  id: number,
): Promise<void> => {
  await manager.query(
    `UPDATE public.games SET deleted_at = now() WHERE id = $1`,
    [id],
  );
};

const findById = async (
  manager: EntityManager,
  id: number,
): Promise<GameRawEntity> => {
  const [game] = await manager.query(
    `select * from public.games g where g.id = $1`,
    [id],
  );
  return game;
};

export const gameSeedManager = (manager: EntityManager): GameSeedManager => ({
  create: (props: GameCreateSeed) => gameCreateSeed(manager, props),
  softDeleteOneById: (id: number) => softDeleteOneById(manager, id),
  findById: (id: number) => findById(manager, id),
});

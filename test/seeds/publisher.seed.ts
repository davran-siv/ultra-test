import { EntityManager } from 'typeorm';

export interface PublisherSeedManager {
  create: () => Promise<{ id: number }>;
  deleteById: (id: number) => Promise<void>;
}

const publisherSeed = async (
  manager: EntityManager,
): Promise<{ id: number }> => {
  const [publisher] = await manager.query(`
    INSERT INTO public.publishers (id, name, siret, phone)
    VALUES (DEFAULT, 'publisher', 11, '11-22') RETURNING id`);
  return publisher;
};

const publisherDeleteById = async (
  manager: EntityManager,
  id: number,
): Promise<void> => {
  await manager.query(`DELETE FROM public.publishers where id = $1`, [id]);
};

export const publisherSeedManager = (
  manager: EntityManager,
): PublisherSeedManager => ({
  create: () => publisherSeed(manager),
  deleteById: (id: number) => publisherDeleteById(manager, id),
});

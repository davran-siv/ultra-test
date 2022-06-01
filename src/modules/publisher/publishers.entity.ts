import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GamesEntity } from '../games/games.entity';

@Entity('publishers')
export class PublishersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  siret: number;

  @OneToMany(() => GamesEntity, (games) => games.publisher)
  games: GamesEntity;

  @Column()
  phone: string;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

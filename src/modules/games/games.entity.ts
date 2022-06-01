import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NumericColumnTransformer } from '../../shared/repositry/numeric-column/numeric-column.transformer';
import { PublishersEntity } from '../publisher/publishers.entity';

@Entity('games')
export class GamesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    precision: 15,
    scale: 3,
    transformer: new NumericColumnTransformer(),
    nullable: false,
    type: 'numeric',
  })
  price: number;

  @Column()
  publisherId: number;

  @ManyToOne(() => PublishersEntity, (publisher) => publisher.games)
  @JoinColumn({ name: 'publisher_id' })
  publisher: PublishersEntity;

  @Column({ type: 'jsonb' })
  tags: string[];

  @Column()
  releaseDate: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

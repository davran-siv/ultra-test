import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitGamesTable1654090749059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', length: '255' },
          { name: 'price', type: 'numeric(15, 5)' },
          { name: 'publisher_id', type: 'int' },
          {
            name: 'tags',
            type: 'jsonb',
          },
          {
            name: 'release_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['publisher_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishers',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }
}

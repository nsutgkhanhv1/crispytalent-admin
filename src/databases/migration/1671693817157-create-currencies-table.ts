import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCurrenciesTable1671693817157 implements MigrationInterface {
  name = 'createCurrenciesTable1671693817157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'currencies',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'symbol',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'decimal',
            type: 'integer',
            isNullable: false,
            default: 18,
          },
          {
            name: 'img',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'date',
          },
          {
            name: 'updatedAt',
            type: 'date',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('currencies');
  }
}

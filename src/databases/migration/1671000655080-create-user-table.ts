import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1671000655080 implements MigrationInterface {
  name = 'createUserTable1671000655080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'country_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'pubkey',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'nonce',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'num_of_followers',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'num_of_followings',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'profile_img',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'banner_img',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'facebook_url',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'twitter_url',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'youtube_url',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'instagram_url',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar(255)',
            isNullable: false,
            default: "'en'",
          },
          {
            name: 'is_partner',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'type_user',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'date',
          },
          {
            name: 'updated_at',
            type: 'date',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

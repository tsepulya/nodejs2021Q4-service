/* eslint-disable class-methods-use-this */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class MigrationApp1642264339638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_db',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'task_db',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'boardId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'columnId',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'column_db',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'board_db',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'column_db',
      new TableColumn({
        name: 'boardId',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'column_db',
      new TableForeignKey({
        columnNames: ['boardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'board_db',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_db')
      .values({
        id: '56629930-ba59-436e-94a7-ca29b294f3e9',
        name: 'Somebody',
        login: 'admin',
        password:
          '$2a$10$o2.UawkUECYY0OlJADjqS.Jv/OWChxHwXyx51wWQvo0x3RvgrWPZO',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('column_db');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('boardId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('column_db', foreignKey);
      }
    }
    await queryRunner.dropColumn('column_db', 'boardId');
    await queryRunner.dropTable('user_db');
    await queryRunner.dropTable('task_db');
    await queryRunner.dropTable('board_db');
    await queryRunner.dropTable('column_db');
  }
}

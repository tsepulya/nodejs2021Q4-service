/* eslint-disable class-methods-use-this */
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class MigrationApp1642264339638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_db",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                }
            ]
        }), true);
        await queryRunner.createTable(new Table({
            name: "task_db",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "order",
                    type: "int",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "boardId",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "columnId",
                    type: "varchar",
                    isNullable: true,
                }
            ]
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_db");
    }

}

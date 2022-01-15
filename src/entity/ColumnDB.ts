import {Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
// eslint-disable-next-line import/no-cycle
import { BoardDB } from "./BoardDB";

@Entity({ name: "column_db" })
export class ColumnDB {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    order!: number;

    @ManyToOne(() => BoardDB, board => board.columns, {onDelete: 'CASCADE'})
    board!: BoardDB;

}


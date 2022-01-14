/* eslint-disable import/no-cycle */
import {Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ColumnDB } from "./ColumnDB";

@Entity()
export class BoardDB {

    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @OneToMany(() => ColumnDB, column => column.board, {
        cascade: true
    })
    columns!: ColumnDB[];

}

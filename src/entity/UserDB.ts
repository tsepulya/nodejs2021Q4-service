import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({ name: "user_db" })
export class UserDB {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    login!: string;

    @Column()
    password?: string;

}

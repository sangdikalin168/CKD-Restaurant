import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tables extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    table_id: number;

    @Field()
    @Column()
    table_name!: string;

    //Available/Occupied
    @Field()
    @Column({ default: "Available" })
    status: string;

}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    category_id: number;

    @Field()
    @Column({ length: 50 })
    category_name: string;
}

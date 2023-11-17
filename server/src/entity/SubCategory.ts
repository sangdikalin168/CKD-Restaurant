import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class SubCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    subcategory_id: number;

    @Field()
    @Column()
    category_id: number;

    @Field()
    @Column({ length: 50 })
    subcategory_name: string;

    @Field()
    category_name: string;
}

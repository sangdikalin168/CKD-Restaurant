import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    product_id!: number;

    @Field()
    @Column({ length: 50 })
    product_name!: string;

    @Field()
    @Column({ type: "double" })
    price: number

    @Field()
    @Column({ type: "double" })
    vip_price: number

    @Field()
    @Column()
    category_id: number

    @Field({ nullable: true })
    @Column({ nullable: true })
    subcategory_id!: number

    @Field()
    @Column()
    image_url: string

    @Field()
    @Column({ length: 20 })
    //cooking - stock
    item_type: string

    @Field({ nullable: true })
    category_name: string

    @Field({ nullable: true })
    subcategory_name: string
}

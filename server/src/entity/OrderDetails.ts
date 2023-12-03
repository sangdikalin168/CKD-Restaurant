import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class OrderDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    detail_id: number;

    @Field()
    @Column()
    order_id: number;

    @Field()
    @Column()
    product_id: number;

    @Field()
    @Column()
    product_name: string;

    @Field()
    @Column()
    quantity: number;

    @Field()
    @Column({ type: "double" })
    unit_price: number;

    @Field()
    @Column()
    description: string;
}

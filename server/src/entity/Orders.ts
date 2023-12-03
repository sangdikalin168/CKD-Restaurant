import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    order_id: number;

    @Field()
    @Column()
    payment_id: number

    @Field()
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    order_date: string

    @Field()
    @Column()
    order_by: number;

    @Field({ defaultValue: 0 })
    @Column({ type: "double" })
    sub_total: number;

    @Field({ defaultValue: 0 })
    @Column()
    queue_no: number;

    @Field({ defaultValue: 0 })
    @Column()
    table_id: number;
}

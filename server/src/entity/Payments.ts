import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Payments extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    payment_id: number;

    @Field()
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    payment_date: string

    @Field()
    @Column()
    payment_by: number;

    @Field()
    @Column()
    payment_method: string;

    @Field()
    @Column({ type: "double" })
    total_amount: number

    @Field()
    @Column({ type: "double" })
    discount: number

    @Field()
    @Column({ type: "double" })
    grand_total: number

    //Pending/Paid
    @Field()
    @Column({ default: "Pending" })
    payment_status: string


}

import { Payments } from "../entity/Payments";
import {
    Arg,
    Field,
    InterfaceType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";


@ObjectType()
class PaymentMutationResponse {
    @Field()
    code: number;
    @Field()
    success: boolean;
    @Field({ nullable: true })
    message?: string;
    @Field({ nullable: true })
    payment_id?: number;
}



@ObjectType()
class Tables {
    @Field()
    table_id: number;

    @Field()
    table_name: string;

    @Field()
    status: string;
}

@Resolver()
export class PaymentResolver {
    @Query((_return) => [Payments])
    async Payments(): Promise<Payments[]> {
        return await Payments.find({ order: { payment_id: "DESC" } });
    }

    @Query((_return) => [Tables])
    async Tables(): Promise<Tables[]> {
        const res = await Payments.query(`SELECT * FROM Tables`);
        return JSON.parse(JSON.stringify(res));
    }


    @Query((_return) => Payments)
    async PaymentByTableID(
        @Arg("table_id") table_id: number
    ) {
        const res = await Payments.query(`SELECT payments.payment_id FROM payments INNER JOIN orders ON orders.payment_id = payments.payment_id WHERE payments.payment_status = "Pending" AND orders.table_id = ${table_id};`);
        return { payment_id: res[0].payment_id }
    }

    @Mutation((_return) => PaymentMutationResponse)
    async UpdateTableStatus(
        @Arg("table_id") table_id: number,
        @Arg("status") status: string
    ) {
        await Payments.query(`Update tables SET status="${status}" WHERE table_id=${table_id}`)
        return {
            code: 200,
            success: true,
            message: "ជោគជ័យ"
        }
    }

    @Mutation((_return) => PaymentMutationResponse)
    async CreatePayment(
        @Arg("payment_by") payment_by: number,
        @Arg("total_amount") total_amount: number,
        @Arg("discount") discount: number,
        @Arg("grand_total") grand_total: number,
        @Arg("payment_status") payment_status: string,
        @Arg("payment_method") payment_method: string,
    ): Promise<PaymentMutationResponse> {
        const isCreated = await Payments.create({
            payment_by: payment_by,
            total_amount: total_amount,
            discount: discount,
            grand_total: grand_total,
            payment_status: payment_status,
            payment_method: payment_method
        }).save();

        if (isCreated.payment_id) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
                payment_id: isCreated.payment_id
            }
        }
        return {
            code: 400,
            success: false,
            message: "បង្កើត Payment បរាជ័យ!!!",
        }
    }

    @Mutation((_return) => PaymentMutationResponse)
    async UpdatePayment(
        @Arg("payment_id") payment_id: number,
        @Arg("payment_by") payment_by: number,
        @Arg("total_amount") total_amount: number,
        @Arg("discount") discount: number,
        @Arg("grand_total") grand_total: number,
        @Arg("payment_status") payment_status: string,
        @Arg("payment_method") payment_method: string,
    ): Promise<PaymentMutationResponse> {
        const isCreated = await Payments.update({ payment_id: payment_id }, {
            payment_by: payment_by,
            total_amount: total_amount,
            discount: discount,
            grand_total: grand_total,
            payment_status: payment_status,
            payment_method: payment_method
        });

        if (isCreated.affected) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
                payment_id: 1
            }
        }
        return {
            code: 400,
            success: false,
            message: "បង្កើត Payment បរាជ័យ!!!",
        }
    }
}
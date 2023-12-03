import { Orders } from "../entity/Orders";
import {
    Arg,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";


@ObjectType()
class OrderMutationResponse {
    @Field()
    code: number;
    @Field()
    success: boolean;
    @Field({ nullable: true })
    message?: string;
    @Field({ nullable: true })
    order_id?: number;
    @Field({ nullable: true })
    queue_no?: number;
}


@Resolver()
export class OrderResolver {
    @Query((_return) => [Orders])
    async Orders(): Promise<Orders[]> {
        return await Orders.find({ order: { payment_id: "DESC" } });
    }

    @Query((_return) => Orders)
    async Order(
        @Arg("order_id") order_id: number
    ): Promise<Orders | null> {
        return await Orders.findOne({ where: { order_id: order_id } });
    }

    @Mutation((_return) => OrderMutationResponse)
    async CreateOrder(
        @Arg("payment_id") payment_id: number,
        @Arg("order_by") order_by: number,
        @Arg("sub_total") sub_total: number,
        @Arg("order_type") order_type: string,
        @Arg("table_id") table_id: number
    ): Promise<OrderMutationResponse> {

        const get_queue_no = await Orders.query(`SELECT IFNULL(MAX(queue_no) + 1,1) as queue_no FROM orders WHERE order_date >= CURRENT_DATE();`)
        const queue_number = order_type === "take_away" ? get_queue_no[0].queue_no : 0

        const isCreated = await Orders.create({
            payment_id: payment_id,
            order_by: order_by,
            sub_total: sub_total,
            queue_no: queue_number,
            table_id: table_id
        }).save();

        if (isCreated.order_id) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
                order_id: isCreated.order_id,
                queue_no: queue_number
            }
        }

        return {
            code: 400,
            success: false,
            message: "បង្កើត Order បរាជ័យ!!!",
        }
    }
}
import { OrderDetails } from "../entity/OrderDetails";
import {
    Arg,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";


@ObjectType()
class OrderDetailMutationResponse {
    @Field()
    code: number;
    @Field()
    success: boolean;
    @Field({ nullable: true })
    message?: string;
    @Field({ nullable: true })
    order_id?: number;
}

@InputType()
export class CreateDetailInput {
    @Field()
    order_id: number;

    @Field()
    product_id: number;

    @Field()
    product_name: string

    @Field()
    quantity: number;

    @Field()
    unit_price: number;

    @Field()
    description: string;

    @Field()
    item_type: string;
}

@ObjectType()
class OrderDetailField {
    @Field()
    product_id: number;

    @Field()
    product_name: string;

    @Field()
    qty: number;

    @Field()
    unit_price: number;

    @Field()
    total: number;
}

@Resolver()
export class OrderDetailResolver {

    @Query((_return) => [OrderDetailField])
    async GetOrderDetails(
        @Arg("dateFrom") dateFrom: string,
        @Arg("dateTo") dateTo: string
    ): Promise<OrderDetailField[]> {
        const res = await OrderDetails.query(`SELECT product_id,product_name,SUM(quantity) as qty,unit_price,SUM(unit_price) as total  FROM orders
INNER JOIN order_details ON orders.order_id = order_details.order_id
WHERE order_date BETWEEN '${dateFrom} 00:00:00' AND '${dateTo} 23:56:39'
GROUP BY product_id;`);
        return JSON.parse(JSON.stringify(res));
    }


    @Mutation((_return) => OrderDetailMutationResponse)
    async CreateOrderDetail(
        @Arg("object", () => [CreateDetailInput]) objects: CreateDetailInput
    ): Promise<OrderDetailMutationResponse> {

        const res = await OrderDetails.createQueryBuilder().insert().into(OrderDetails).values(objects).execute();

        if (res.raw.affectedRows < 0) {
            return {
                code: 400,
                success: true,
                message: "Failed"
            }
        }

        return {
            code: 200,
            success: true,
            message: "ជោគជ័យ",
            order_id: 1
        }
    }
}
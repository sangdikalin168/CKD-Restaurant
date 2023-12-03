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

@Resolver()
export class OrderDetailResolver {

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
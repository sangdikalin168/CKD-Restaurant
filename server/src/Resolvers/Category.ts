import { Category } from "../entity/Category";
import {
    Arg,
    Field,
    InterfaceType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";


@InterfaceType()
abstract class Response {

    @Field()
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
}

@ObjectType({ implements: Response })
class MutationResponse implements Response {
    code: number;
    success: boolean;
    message?: string;
}


@Resolver()
export class CategoryResolver {

    @Query((_return) => [Category])
    async Category(): Promise<Category[]> {
        return await Category.find({ order: { category_id: "DESC" } });
    }

    @Mutation((_return) => MutationResponse)
    async CreateCategory(
        @Arg("category_name") category_name: string,
    ): Promise<MutationResponse> {
        const isExist = await Category.findOne({
            where: { category_name: category_name }
        });
        if (isExist) {
            return {
                code: 400,
                success: false,
                message: "មានរួចហើយ!!!",
            }
        }

        const isCreated = await Category.create({
            category_name
        }).save();

        if (isCreated.category_id) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
            }
        }

        return {
            code: 400,
            success: false,
            message: "បង្កើតទំនិញបរាជ័យ!!!",
        }
    }

    @Mutation((_return) => MutationResponse)
    async UpdateCategory(
        @Arg("category_name") category_name: string,
        @Arg("category_id") category_id: number,
    ): Promise<MutationResponse> {
        const isCreated = await Category.update({
            category_id: category_id
        }, {
            category_name
        });

        if (isCreated.affected) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
            }
        }

        return {
            code: 400,
            success: false,
            message: "បរាជ័យ!!!",
        }
    }
}
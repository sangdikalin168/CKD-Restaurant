import { Category } from "../entity/Category";
import { SubCategory } from "../entity/SubCategory";
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
class SubCategoryResponse {
    @Field()
    code: number;

    @Field()
    success: boolean;

    @Field()
    message?: string;
}

@Resolver()
export class SubCategoryResolver {
    @Query((_return) => [SubCategory])
    async SubCategory(): Promise<SubCategory[]> {
        return await SubCategory.createQueryBuilder("sub_category")
            .innerJoin(Category, "category", "category.category_id = sub_category.category_id")
            .select(["subcategory_id", "sub_category.category_id as category_id", "category_name", "subcategory_name"])
            .groupBy("subcategory_id")
            .getRawMany();
    }

    @Mutation(() => SubCategoryResponse)
    async CreateSubCategory(
        @Arg("subcategory_name") subcategory_name: string,
        @Arg("category_id") category_id: number,
    ) {
        const isExist = await SubCategory.findOne({
            where: { subcategory_name: subcategory_name }
        });
        if (isExist) {
            return {
                code: 400,
                success: false,
                message: "មានរួចហើយ!!!",
            }
        }

        const isCreated = await SubCategory.create({
            subcategory_name,
            category_id
        }).save();

        if (isCreated.subcategory_id) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
            }
        }

        return {
            code: 400,
            success: false,
            message: "បង្កើតបរាជ័យ!!!",
        }
    }

    @Mutation(() => SubCategoryResponse)
    async UpdateSubCategory(
        @Arg("subcategory_name") subcategory_name: string,
        @Arg("category_id") category_id: number,
        @Arg("subcategory_id") subcategory_id: number,
    ) {
        const isCreated = await SubCategory.update({ subcategory_id: subcategory_id }, {
            subcategory_name,
            category_id
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
import { Product } from "../entity/Product";
import {
    Arg,
    Field,
    InterfaceType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { Stream } from "stream";
import { createWriteStream } from "fs";
import { Category } from "../entity/Category";
import { SubCategory } from "../entity/SubCategory";


@InterfaceType()
export abstract class ProductResponse {

    @Field()
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
}

@ObjectType({ implements: ProductResponse })
export class ProductMutationResponse implements ProductResponse {
    code: number;
    success: boolean;
    message?: string;
}

interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

@Resolver()
export class ProductResolver {

    @Query((_return) => [Product])
    async Product(): Promise<Product[]> {
        const result = await Product.createQueryBuilder("product")
            .leftJoin(Category, "category", "category.category_id = product.category_id")
            .leftJoin(SubCategory, "subcategory", "subcategory.subcategory_id = product.subcategory_id")
            .select(["product.product_id as product_id", "product_name", "price", "vip_price", "product.category_id as category_id", "product.subcategory_id as subcategory_id", "image_url", "item_type", "category_name", "subcategory_name"])
            .groupBy("product.product_id")
            .orderBy("product.product_id", "DESC")
            .getRawMany();
        return result
    }

    @Mutation((_return) => ProductMutationResponse)
    async CreateProduct(
        @Arg("product_name") product_name: string,
        @Arg("price") price: number,
        @Arg("vip_price") vip_price: number,
        @Arg("category_id") category_id: number,
        @Arg("subcategory_id") subcategory_id: number,
        @Arg("item_type") item_type: string,
        @Arg("picture", () => require("graphql-upload-ts").GraphQLUpload) upload: Upload
    ): Promise<ProductMutationResponse> {
        const { createReadStream } = upload;
        
        const isExist = await Product.findOne({
            where: { product_name: product_name }
        });

        if (isExist) {
            return new Promise(async (resolve, reject) =>
                createReadStream()
                    .pipe(
                        createWriteStream(
                            __dirname + `/../images/products/${product_name}.jpg`
                        )
                    )
                    .on("finish", () =>
                        resolve({
                            code: 400,
                            success: false,
                            message: "មុខទំនិញមានរួចហើយ!!!",
                        })
                    )
                    .on("close", () =>
                        resolve({
                            code: 400,
                            success: false,
                            message: "មុខទំនិញមានរួចហើយ!!!",
                        })
                    )
                    .on("error", (err) => reject(err))
            );
        }
        const isCreated = await Product.create({
            product_name: product_name,
            price: price,
            vip_price: vip_price,
            category_id: category_id,
            subcategory_id: subcategory_id,
            item_type: item_type,
        }).save();

        if (isCreated.product_id) {
            return new Promise(async (resolve, reject) =>
                createReadStream()
                    .pipe(
                        createWriteStream(
                            __dirname + `/../images/products/${isCreated.product_id}.jpg`
                        )
                    )
                    .on("finish", () =>
                        resolve({
                            code: 200,
                            success: true,
                            message: "Product created",
                        })
                    )
                    .on("close", () =>
                        resolve({
                            code: 200,
                            success: true,
                            message: "Product created",
                        })
                    )
                    .on("error", (err) => reject(err))
            );
        }

        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(
                    createWriteStream(
                        __dirname + `/../images/products/${product_name}.jpg`
                    )
                )
                .on("finish", () =>
                    resolve({
                        code: 400,
                        success: false,
                        message: "បង្កើតទំនិញបរាជ័យ!!!",
                    })
                )
                .on("close", () =>
                    resolve({
                        code: 400,
                        success: false,
                        message: "បង្កើតទំនិញបរាជ័យ!!!",
                    })
                )
                .on("error", (err) => reject(err))
        );
    }

    @Mutation((_return) => ProductMutationResponse)
    async UpdateProduct(
        @Arg("product_id") product_id: number,
        @Arg("product_name") product_name: string,
        @Arg("price") price: number,
        @Arg("vip_price") vip_price: number,
        @Arg("category_id") category_id: number,
        @Arg("subcategory_id") subcategory_id: number,
        @Arg("item_type") item_type: string,
    ): Promise<ProductMutationResponse> {

        const isUpdated = await Product.update({
            product_id: product_id
        }, {
            product_name: product_name,
            price: price,
            vip_price: vip_price,
            category_id: category_id,
            subcategory_id: subcategory_id,
            item_type: item_type,
        });

        if (isUpdated.affected) {
            return {
                code: 200,
                success: true,
                message: "ជោគជ័យ",
            }
        }

        return {
            code: 400,
            success: false,
            message: "កែប្រែទំនិញបរាជ័យ!!!",
        };
    }

    @Mutation((_return) => ProductMutationResponse)
    async UpdateProductWithImage(
        @Arg("product_id") product_id: number,
        @Arg("product_name") product_name: string,
        @Arg("price") price: number,
        @Arg("vip_price") vip_price: number,
        @Arg("category_id") category_id: number,
        @Arg("subcategory_id") subcategory_id: number,
        @Arg("item_type") item_type: string,
        @Arg("picture", () => require("graphql-upload-ts").GraphQLUpload, { nullable: true }) upload: Upload
    ): Promise<ProductMutationResponse> {
        const { createReadStream } = upload;
        const isUpdated = await Product.update({
            product_id: product_id
        }, {
            product_name: product_name,
            price: price,
            vip_price: vip_price,
            category_id: category_id,
            subcategory_id: subcategory_id,
            item_type: item_type,
        });

        if (isUpdated.affected) {
            return new Promise(async (resolve, reject) =>
                createReadStream()
                    .pipe(
                        createWriteStream(
                            __dirname + `/../images/products/${product_id}.jpg`
                        )
                    )
                    .on("finish", () =>
                        resolve({
                            code: 200,
                            success: true,
                            message: "ជោគជ័យ",
                        })
                    )
                    .on("close", () =>
                        resolve({
                            code: 200,
                            success: true,
                            message: "ជោគជ័យ",
                        })
                    )
                    .on("error", (err) => reject(err))
            );
        }

        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(
                    createWriteStream(
                        __dirname + `/../images/products/${product_name}.jpg`
                    )
                )
                .on("finish", () =>
                    resolve({
                        code: 400,
                        success: false,
                        message: "កែប្រែទំនិញបរាជ័យ!!!",
                    })
                )
                .on("close", () =>
                    resolve({
                        code: 400,
                        success: false,
                        message: "កែប្រែទំនិញបរាជ័យ!!!",
                    })
                )
                .on("error", (err) => reject(err))
        );
    }
}
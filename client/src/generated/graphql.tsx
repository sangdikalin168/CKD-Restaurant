import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  category_id: Scalars['Float'];
  category_name: Scalars['String'];
};

export type GetUser = {
  __typename?: 'GetUser';
  branch: Scalars['String'];
  display_name: Scalars['String'];
  role: Scalars['String'];
  user_id: Scalars['ID'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCategory: MutationResponse;
  CreateProduct: ProductMutationResponse;
  CreateSubCategory: SubCategoryResponse;
  UpdateCategory: MutationResponse;
  UpdateProduct: ProductMutationResponse;
  UpdateProductWithImage: ProductMutationResponse;
  UpdateSubCategory: SubCategoryResponse;
  create_user: UserMutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
};


export type MutationCreateCategoryArgs = {
  category_name: Scalars['String'];
};


export type MutationCreateProductArgs = {
  category_id: Scalars['Float'];
  item_type: Scalars['String'];
  picture: Scalars['Upload'];
  price: Scalars['Float'];
  product_name: Scalars['String'];
  subcategory_id: Scalars['Float'];
  vip_price: Scalars['Float'];
};


export type MutationCreateSubCategoryArgs = {
  category_id: Scalars['Float'];
  subcategory_name: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  category_id: Scalars['Float'];
  category_name: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  category_id: Scalars['Float'];
  item_type: Scalars['String'];
  price: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  subcategory_id: Scalars['Float'];
  vip_price: Scalars['Float'];
};


export type MutationUpdateProductWithImageArgs = {
  category_id: Scalars['Float'];
  item_type: Scalars['String'];
  picture?: InputMaybe<Scalars['Upload']>;
  price: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  subcategory_id: Scalars['Float'];
  vip_price: Scalars['Float'];
};


export type MutationUpdateSubCategoryArgs = {
  category_id: Scalars['Float'];
  subcategory_id: Scalars['Float'];
  subcategory_name: Scalars['String'];
};


export type MutationCreate_UserArgs = {
  userInput: RegisterInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  user_id: Scalars['ID'];
};

export type MutationResponse = Response & {
  __typename?: 'MutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Product = {
  __typename?: 'Product';
  category_id: Scalars['Float'];
  category_name: Scalars['String'];
  image_url: Scalars['String'];
  item_type: Scalars['String'];
  price: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  subcategory_id?: Maybe<Scalars['Float']>;
  subcategory_name: Scalars['String'];
  vip_price: Scalars['Float'];
};

export type ProductMutationResponse = ProductResponse & {
  __typename?: 'ProductMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ProductResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  Category: Array<Category>;
  Product: Array<Product>;
  SubCategory: Array<SubCategory>;
  get_user: GetUser;
  users: Array<User>;
};


export type QueryGet_UserArgs = {
  user_id: Scalars['ID'];
};

export type RegisterInput = {
  display_name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type Response = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  category_id: Scalars['Float'];
  category_name: Scalars['String'];
  subcategory_id: Scalars['Float'];
  subcategory_name: Scalars['String'];
};

export type SubCategoryResponse = {
  __typename?: 'SubCategoryResponse';
  code: Scalars['Float'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  display_name: Scalars['String'];
  image: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
  user_id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryQuery = { __typename?: 'Query', Category: Array<{ __typename?: 'Category', category_id: number, category_name: string }> };

export type CreateCategoryMutationVariables = Exact<{
  categoryName: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', CreateCategory: { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null } };

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars['Float'];
  categoryName: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', UpdateCategory: { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null } };

export type CreateProductMutationVariables = Exact<{
  picture: Scalars['Upload'];
  itemType: Scalars['String'];
  subcategoryId: Scalars['Float'];
  categoryId: Scalars['Float'];
  vipPrice: Scalars['Float'];
  price: Scalars['Float'];
  productName: Scalars['String'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', CreateProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null } };

export type ProductQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductQuery = { __typename?: 'Query', Product: Array<{ __typename?: 'Product', product_id: number, product_name: string, price: number, vip_price: number, category_id: number, subcategory_id?: number | null, image_url: string, item_type: string, category_name: string, subcategory_name: string }> };

export type UpdateProductMutationVariables = Exact<{
  itemType: Scalars['String'];
  subcategoryId: Scalars['Float'];
  categoryId: Scalars['Float'];
  vipPrice: Scalars['Float'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  productId: Scalars['Float'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', UpdateProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null } };

export type UpdateProductWithImageMutationVariables = Exact<{
  itemType: Scalars['String'];
  subcategoryId: Scalars['Float'];
  categoryId: Scalars['Float'];
  vipPrice: Scalars['Float'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  productId: Scalars['Float'];
  picture?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateProductWithImageMutation = { __typename?: 'Mutation', UpdateProductWithImage: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null } };

export type CreateSubCategoryMutationVariables = Exact<{
  categoryId: Scalars['Float'];
  subcategoryName: Scalars['String'];
}>;


export type CreateSubCategoryMutation = { __typename?: 'Mutation', CreateSubCategory: { __typename?: 'SubCategoryResponse', code: number, success: boolean, message: string } };

export type SubCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type SubCategoryQuery = { __typename?: 'Query', SubCategory: Array<{ __typename?: 'SubCategory', subcategory_id: number, category_id: number, subcategory_name: string, category_name: string }> };

export type UpdateSubCategoryMutationVariables = Exact<{
  subcategoryId: Scalars['Float'];
  categoryId: Scalars['Float'];
  subcategoryName: Scalars['String'];
}>;


export type UpdateSubCategoryMutation = { __typename?: 'Mutation', UpdateSubCategory: { __typename?: 'SubCategoryResponse', code: number, success: boolean, message: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', display_name: string, role: string, user_id: string } | null } };


export const CategoryDocument = gql`
    query Category {
  Category {
    category_id
    category_name
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($categoryName: String!) {
  CreateCategory(category_name: $categoryName) {
    code
    success
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($categoryId: Float!, $categoryName: String!) {
  UpdateCategory(category_id: $categoryId, category_name: $categoryName) {
    code
    success
    message
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($picture: Upload!, $itemType: String!, $subcategoryId: Float!, $categoryId: Float!, $vipPrice: Float!, $price: Float!, $productName: String!) {
  CreateProduct(
    picture: $picture
    item_type: $itemType
    subcategory_id: $subcategoryId
    category_id: $categoryId
    vip_price: $vipPrice
    price: $price
    product_name: $productName
  ) {
    code
    success
    message
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *      itemType: // value for 'itemType'
 *      subcategoryId: // value for 'subcategoryId'
 *      categoryId: // value for 'categoryId'
 *      vipPrice: // value for 'vipPrice'
 *      price: // value for 'price'
 *      productName: // value for 'productName'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ProductDocument = gql`
    query Product {
  Product {
    product_id
    product_name
    price
    vip_price
    category_id
    subcategory_id
    image_url
    item_type
    category_name
    subcategory_name
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductQuery(baseOptions?: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($itemType: String!, $subcategoryId: Float!, $categoryId: Float!, $vipPrice: Float!, $price: Float!, $productName: String!, $productId: Float!) {
  UpdateProduct(
    item_type: $itemType
    subcategory_id: $subcategoryId
    category_id: $categoryId
    vip_price: $vipPrice
    price: $price
    product_name: $productName
    product_id: $productId
  ) {
    code
    success
    message
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      itemType: // value for 'itemType'
 *      subcategoryId: // value for 'subcategoryId'
 *      categoryId: // value for 'categoryId'
 *      vipPrice: // value for 'vipPrice'
 *      price: // value for 'price'
 *      productName: // value for 'productName'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateProductWithImageDocument = gql`
    mutation UpdateProductWithImage($itemType: String!, $subcategoryId: Float!, $categoryId: Float!, $vipPrice: Float!, $price: Float!, $productName: String!, $productId: Float!, $picture: Upload) {
  UpdateProductWithImage(
    item_type: $itemType
    subcategory_id: $subcategoryId
    category_id: $categoryId
    vip_price: $vipPrice
    price: $price
    product_name: $productName
    product_id: $productId
    picture: $picture
  ) {
    code
    success
    message
  }
}
    `;
export type UpdateProductWithImageMutationFn = Apollo.MutationFunction<UpdateProductWithImageMutation, UpdateProductWithImageMutationVariables>;

/**
 * __useUpdateProductWithImageMutation__
 *
 * To run a mutation, you first call `useUpdateProductWithImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductWithImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductWithImageMutation, { data, loading, error }] = useUpdateProductWithImageMutation({
 *   variables: {
 *      itemType: // value for 'itemType'
 *      subcategoryId: // value for 'subcategoryId'
 *      categoryId: // value for 'categoryId'
 *      vipPrice: // value for 'vipPrice'
 *      price: // value for 'price'
 *      productName: // value for 'productName'
 *      productId: // value for 'productId'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useUpdateProductWithImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductWithImageMutation, UpdateProductWithImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductWithImageMutation, UpdateProductWithImageMutationVariables>(UpdateProductWithImageDocument, options);
      }
export type UpdateProductWithImageMutationHookResult = ReturnType<typeof useUpdateProductWithImageMutation>;
export type UpdateProductWithImageMutationResult = Apollo.MutationResult<UpdateProductWithImageMutation>;
export type UpdateProductWithImageMutationOptions = Apollo.BaseMutationOptions<UpdateProductWithImageMutation, UpdateProductWithImageMutationVariables>;
export const CreateSubCategoryDocument = gql`
    mutation CreateSubCategory($categoryId: Float!, $subcategoryName: String!) {
  CreateSubCategory(category_id: $categoryId, subcategory_name: $subcategoryName) {
    code
    success
    message
  }
}
    `;
export type CreateSubCategoryMutationFn = Apollo.MutationFunction<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;

/**
 * __useCreateSubCategoryMutation__
 *
 * To run a mutation, you first call `useCreateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubCategoryMutation, { data, loading, error }] = useCreateSubCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      subcategoryName: // value for 'subcategoryName'
 *   },
 * });
 */
export function useCreateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>(CreateSubCategoryDocument, options);
      }
export type CreateSubCategoryMutationHookResult = ReturnType<typeof useCreateSubCategoryMutation>;
export type CreateSubCategoryMutationResult = Apollo.MutationResult<CreateSubCategoryMutation>;
export type CreateSubCategoryMutationOptions = Apollo.BaseMutationOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;
export const SubCategoryDocument = gql`
    query SubCategory {
  SubCategory {
    subcategory_id
    category_id
    subcategory_name
    category_name
  }
}
    `;

/**
 * __useSubCategoryQuery__
 *
 * To run a query within a React component, call `useSubCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubCategoryQuery(baseOptions?: Apollo.QueryHookOptions<SubCategoryQuery, SubCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubCategoryQuery, SubCategoryQueryVariables>(SubCategoryDocument, options);
      }
export function useSubCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubCategoryQuery, SubCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubCategoryQuery, SubCategoryQueryVariables>(SubCategoryDocument, options);
        }
export type SubCategoryQueryHookResult = ReturnType<typeof useSubCategoryQuery>;
export type SubCategoryLazyQueryHookResult = ReturnType<typeof useSubCategoryLazyQuery>;
export type SubCategoryQueryResult = Apollo.QueryResult<SubCategoryQuery, SubCategoryQueryVariables>;
export const UpdateSubCategoryDocument = gql`
    mutation UpdateSubCategory($subcategoryId: Float!, $categoryId: Float!, $subcategoryName: String!) {
  UpdateSubCategory(
    subcategory_id: $subcategoryId
    category_id: $categoryId
    subcategory_name: $subcategoryName
  ) {
    code
    success
    message
  }
}
    `;
export type UpdateSubCategoryMutationFn = Apollo.MutationFunction<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;

/**
 * __useUpdateSubCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubCategoryMutation, { data, loading, error }] = useUpdateSubCategoryMutation({
 *   variables: {
 *      subcategoryId: // value for 'subcategoryId'
 *      categoryId: // value for 'categoryId'
 *      subcategoryName: // value for 'subcategoryName'
 *   },
 * });
 */
export function useUpdateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>(UpdateSubCategoryDocument, options);
      }
export type UpdateSubCategoryMutationHookResult = ReturnType<typeof useUpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationResult = Apollo.MutationResult<UpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    success
    message
    user {
      display_name
      role
      user_id
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
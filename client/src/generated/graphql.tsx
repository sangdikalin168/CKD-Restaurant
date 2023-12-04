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

export type Billing = {
  __typename?: 'Billing';
  items: Array<OrderDetails168>;
  payment_id: Scalars['Float'];
};

export type Category = {
  __typename?: 'Category';
  category_id: Scalars['Float'];
  category_name: Scalars['String'];
};

export type CreateDetailInput = {
  description: Scalars['String'];
  item_type: Scalars['String'];
  order_id: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  quantity: Scalars['Float'];
  unit_price: Scalars['Float'];
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
  CreateOrder: OrderMutationResponse;
  CreateOrderDetail: OrderDetailMutationResponse;
  CreatePayment: PaymentMutationResponse;
  CreateProduct: ProductMutationResponse;
  CreateSubCategory: SubCategoryResponse;
  UpdateCategory: MutationResponse;
  UpdatePayment: PaymentMutationResponse;
  UpdateProduct: ProductMutationResponse;
  UpdateProductWithImage: ProductMutationResponse;
  UpdateSubCategory: SubCategoryResponse;
  UpdateTableStatus: PaymentMutationResponse;
  create_user: UserMutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
};


export type MutationCreateCategoryArgs = {
  category_name: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  order_by: Scalars['Float'];
  order_type: Scalars['String'];
  payment_id: Scalars['Float'];
  sub_total: Scalars['Float'];
  table_id: Scalars['Float'];
};


export type MutationCreateOrderDetailArgs = {
  object: Array<CreateDetailInput>;
};


export type MutationCreatePaymentArgs = {
  discount: Scalars['Float'];
  grand_total: Scalars['Float'];
  payment_by: Scalars['Float'];
  payment_method: Scalars['String'];
  payment_status: Scalars['String'];
  total_amount: Scalars['Float'];
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


export type MutationUpdatePaymentArgs = {
  discount: Scalars['Float'];
  grand_total: Scalars['Float'];
  payment_by: Scalars['Float'];
  payment_id: Scalars['Float'];
  payment_method: Scalars['String'];
  payment_status: Scalars['String'];
  total_amount: Scalars['Float'];
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


export type MutationUpdateTableStatusArgs = {
  status: Scalars['String'];
  table_id: Scalars['Float'];
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

export type OrderDetailMutationResponse = {
  __typename?: 'OrderDetailMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  description: Scalars['String'];
  detail_id: Scalars['Float'];
  order_id: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  quantity: Scalars['Float'];
  unit_price: Scalars['Float'];
};

export type OrderDetails168 = {
  __typename?: 'OrderDetails168';
  description: Scalars['String'];
  detail_id: Scalars['Float'];
  order_id: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  quantity: Scalars['Float'];
  unit_price: Scalars['Float'];
};

export type OrderMutationResponse = {
  __typename?: 'OrderMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['Float']>;
  queue_no?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
};

export type Orders = {
  __typename?: 'Orders';
  order_by: Scalars['Float'];
  order_date: Scalars['String'];
  order_id: Scalars['Float'];
  payment_id: Scalars['Float'];
  queue_no?: Maybe<Scalars['Float']>;
  sub_total?: Maybe<Scalars['Float']>;
  table_id?: Maybe<Scalars['Float']>;
};

export type PaymentMutationResponse = {
  __typename?: 'PaymentMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  payment_id?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
};

export type Payments = {
  __typename?: 'Payments';
  discount: Scalars['Float'];
  grand_total: Scalars['Float'];
  payment_by: Scalars['Float'];
  payment_date: Scalars['String'];
  payment_id: Scalars['Float'];
  payment_method: Scalars['String'];
  payment_status: Scalars['String'];
  total_amount: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  category_id: Scalars['Float'];
  category_name?: Maybe<Scalars['String']>;
  image_url: Scalars['String'];
  item_type: Scalars['String'];
  price: Scalars['Float'];
  product_id: Scalars['Float'];
  product_name: Scalars['String'];
  subcategory_id?: Maybe<Scalars['Float']>;
  subcategory_name?: Maybe<Scalars['String']>;
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
  Billing: Billing;
  Category: Array<Category>;
  Order: Orders;
  Orders: Array<Orders>;
  PaymentByTableID: Payments;
  Payments: Array<Payments>;
  Product: Array<Product>;
  SubCategory: Array<SubCategory>;
  Tables: Array<Tables>;
  get_user: GetUser;
  users: Array<User>;
};


export type QueryBillingArgs = {
  table_id: Scalars['Float'];
};


export type QueryOrderArgs = {
  order_id: Scalars['Float'];
};


export type QueryPaymentByTableIdArgs = {
  table_id: Scalars['Float'];
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

export type Tables = {
  __typename?: 'Tables';
  status: Scalars['String'];
  table_id: Scalars['Float'];
  table_name: Scalars['String'];
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


export type ProductQuery = { __typename?: 'Query', Product: Array<{ __typename?: 'Product', product_id: number, product_name: string, price: number, vip_price: number, category_id: number, subcategory_id?: number | null, image_url: string, item_type: string, category_name?: string | null, subcategory_name?: string | null }> };

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

export type CreateOrderMutationVariables = Exact<{
  tableId: Scalars['Float'];
  orderType: Scalars['String'];
  subTotal: Scalars['Float'];
  orderBy: Scalars['Float'];
  paymentId: Scalars['Float'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', CreateOrder: { __typename?: 'OrderMutationResponse', code: number, success: boolean, message?: string | null, order_id?: number | null, queue_no?: number | null } };

export type CreateOrderDetailMutationVariables = Exact<{
  object: Array<CreateDetailInput> | CreateDetailInput;
}>;


export type CreateOrderDetailMutation = { __typename?: 'Mutation', CreateOrderDetail: { __typename?: 'OrderDetailMutationResponse', code: number, success: boolean, message?: string | null, order_id?: number | null } };

export type BillingQueryVariables = Exact<{
  tableId: Scalars['Float'];
}>;


export type BillingQuery = { __typename?: 'Query', Billing: { __typename?: 'Billing', payment_id: number, items: Array<{ __typename?: 'OrderDetails168', detail_id: number, order_id: number, product_id: number, product_name: string, quantity: number, unit_price: number, description: string }> } };

export type CreatePaymentMutationVariables = Exact<{
  paymentMethod: Scalars['String'];
  paymentStatus: Scalars['String'];
  grandTotal: Scalars['Float'];
  discount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  paymentBy: Scalars['Float'];
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', CreatePayment: { __typename?: 'PaymentMutationResponse', code: number, success: boolean, message?: string | null, payment_id?: number | null } };

export type PaymentByTableIdQueryVariables = Exact<{
  tableId: Scalars['Float'];
}>;


export type PaymentByTableIdQuery = { __typename?: 'Query', PaymentByTableID: { __typename?: 'Payments', payment_id: number } };

export type TablesQueryVariables = Exact<{ [key: string]: never; }>;


export type TablesQuery = { __typename?: 'Query', Tables: Array<{ __typename?: 'Tables', table_id: number, table_name: string, status: string }> };

export type UpdatePaymentMutationVariables = Exact<{
  paymentMethod: Scalars['String'];
  paymentStatus: Scalars['String'];
  grandTotal: Scalars['Float'];
  discount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  paymentBy: Scalars['Float'];
  paymentId: Scalars['Float'];
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', UpdatePayment: { __typename?: 'PaymentMutationResponse', code: number, success: boolean, message?: string | null, payment_id?: number | null } };

export type UpdateTableStatusMutationVariables = Exact<{
  status: Scalars['String'];
  tableId: Scalars['Float'];
}>;


export type UpdateTableStatusMutation = { __typename?: 'Mutation', UpdateTableStatus: { __typename?: 'PaymentMutationResponse', code: number, success: boolean, message?: string | null } };


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
export const CreateOrderDocument = gql`
    mutation CreateOrder($tableId: Float!, $orderType: String!, $subTotal: Float!, $orderBy: Float!, $paymentId: Float!) {
  CreateOrder(
    table_id: $tableId
    order_type: $orderType
    sub_total: $subTotal
    order_by: $orderBy
    payment_id: $paymentId
  ) {
    code
    success
    message
    order_id
    queue_no
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      tableId: // value for 'tableId'
 *      orderType: // value for 'orderType'
 *      subTotal: // value for 'subTotal'
 *      orderBy: // value for 'orderBy'
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateOrderDetailDocument = gql`
    mutation CreateOrderDetail($object: [CreateDetailInput!]!) {
  CreateOrderDetail(object: $object) {
    code
    success
    message
    order_id
  }
}
    `;
export type CreateOrderDetailMutationFn = Apollo.MutationFunction<CreateOrderDetailMutation, CreateOrderDetailMutationVariables>;

/**
 * __useCreateOrderDetailMutation__
 *
 * To run a mutation, you first call `useCreateOrderDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderDetailMutation, { data, loading, error }] = useCreateOrderDetailMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateOrderDetailMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderDetailMutation, CreateOrderDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderDetailMutation, CreateOrderDetailMutationVariables>(CreateOrderDetailDocument, options);
      }
export type CreateOrderDetailMutationHookResult = ReturnType<typeof useCreateOrderDetailMutation>;
export type CreateOrderDetailMutationResult = Apollo.MutationResult<CreateOrderDetailMutation>;
export type CreateOrderDetailMutationOptions = Apollo.BaseMutationOptions<CreateOrderDetailMutation, CreateOrderDetailMutationVariables>;
export const BillingDocument = gql`
    query Billing($tableId: Float!) {
  Billing(table_id: $tableId) {
    payment_id
    items {
      detail_id
      order_id
      product_id
      product_name
      quantity
      unit_price
      description
    }
  }
}
    `;

/**
 * __useBillingQuery__
 *
 * To run a query within a React component, call `useBillingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillingQuery({
 *   variables: {
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useBillingQuery(baseOptions: Apollo.QueryHookOptions<BillingQuery, BillingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillingQuery, BillingQueryVariables>(BillingDocument, options);
      }
export function useBillingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillingQuery, BillingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillingQuery, BillingQueryVariables>(BillingDocument, options);
        }
export type BillingQueryHookResult = ReturnType<typeof useBillingQuery>;
export type BillingLazyQueryHookResult = ReturnType<typeof useBillingLazyQuery>;
export type BillingQueryResult = Apollo.QueryResult<BillingQuery, BillingQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($paymentMethod: String!, $paymentStatus: String!, $grandTotal: Float!, $discount: Float!, $totalAmount: Float!, $paymentBy: Float!) {
  CreatePayment(
    payment_method: $paymentMethod
    payment_status: $paymentStatus
    grand_total: $grandTotal
    discount: $discount
    total_amount: $totalAmount
    payment_by: $paymentBy
  ) {
    code
    success
    message
    payment_id
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      paymentMethod: // value for 'paymentMethod'
 *      paymentStatus: // value for 'paymentStatus'
 *      grandTotal: // value for 'grandTotal'
 *      discount: // value for 'discount'
 *      totalAmount: // value for 'totalAmount'
 *      paymentBy: // value for 'paymentBy'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const PaymentByTableIdDocument = gql`
    query PaymentByTableID($tableId: Float!) {
  PaymentByTableID(table_id: $tableId) {
    payment_id
  }
}
    `;

/**
 * __usePaymentByTableIdQuery__
 *
 * To run a query within a React component, call `usePaymentByTableIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentByTableIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentByTableIdQuery({
 *   variables: {
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function usePaymentByTableIdQuery(baseOptions: Apollo.QueryHookOptions<PaymentByTableIdQuery, PaymentByTableIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentByTableIdQuery, PaymentByTableIdQueryVariables>(PaymentByTableIdDocument, options);
      }
export function usePaymentByTableIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentByTableIdQuery, PaymentByTableIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentByTableIdQuery, PaymentByTableIdQueryVariables>(PaymentByTableIdDocument, options);
        }
export type PaymentByTableIdQueryHookResult = ReturnType<typeof usePaymentByTableIdQuery>;
export type PaymentByTableIdLazyQueryHookResult = ReturnType<typeof usePaymentByTableIdLazyQuery>;
export type PaymentByTableIdQueryResult = Apollo.QueryResult<PaymentByTableIdQuery, PaymentByTableIdQueryVariables>;
export const TablesDocument = gql`
    query Tables {
  Tables {
    table_id
    table_name
    status
  }
}
    `;

/**
 * __useTablesQuery__
 *
 * To run a query within a React component, call `useTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTablesQuery(baseOptions?: Apollo.QueryHookOptions<TablesQuery, TablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TablesQuery, TablesQueryVariables>(TablesDocument, options);
      }
export function useTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TablesQuery, TablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TablesQuery, TablesQueryVariables>(TablesDocument, options);
        }
export type TablesQueryHookResult = ReturnType<typeof useTablesQuery>;
export type TablesLazyQueryHookResult = ReturnType<typeof useTablesLazyQuery>;
export type TablesQueryResult = Apollo.QueryResult<TablesQuery, TablesQueryVariables>;
export const UpdatePaymentDocument = gql`
    mutation UpdatePayment($paymentMethod: String!, $paymentStatus: String!, $grandTotal: Float!, $discount: Float!, $totalAmount: Float!, $paymentBy: Float!, $paymentId: Float!) {
  UpdatePayment(
    payment_method: $paymentMethod
    payment_status: $paymentStatus
    grand_total: $grandTotal
    discount: $discount
    total_amount: $totalAmount
    payment_by: $paymentBy
    payment_id: $paymentId
  ) {
    code
    success
    message
    payment_id
  }
}
    `;
export type UpdatePaymentMutationFn = Apollo.MutationFunction<UpdatePaymentMutation, UpdatePaymentMutationVariables>;

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      paymentMethod: // value for 'paymentMethod'
 *      paymentStatus: // value for 'paymentStatus'
 *      grandTotal: // value for 'grandTotal'
 *      discount: // value for 'discount'
 *      totalAmount: // value for 'totalAmount'
 *      paymentBy: // value for 'paymentBy'
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useUpdatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument, options);
      }
export type UpdatePaymentMutationHookResult = ReturnType<typeof useUpdatePaymentMutation>;
export type UpdatePaymentMutationResult = Apollo.MutationResult<UpdatePaymentMutation>;
export type UpdatePaymentMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>;
export const UpdateTableStatusDocument = gql`
    mutation UpdateTableStatus($status: String!, $tableId: Float!) {
  UpdateTableStatus(status: $status, table_id: $tableId) {
    code
    success
    message
  }
}
    `;
export type UpdateTableStatusMutationFn = Apollo.MutationFunction<UpdateTableStatusMutation, UpdateTableStatusMutationVariables>;

/**
 * __useUpdateTableStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTableStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTableStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTableStatusMutation, { data, loading, error }] = useUpdateTableStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useUpdateTableStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTableStatusMutation, UpdateTableStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTableStatusMutation, UpdateTableStatusMutationVariables>(UpdateTableStatusDocument, options);
      }
export type UpdateTableStatusMutationHookResult = ReturnType<typeof useUpdateTableStatusMutation>;
export type UpdateTableStatusMutationResult = Apollo.MutationResult<UpdateTableStatusMutation>;
export type UpdateTableStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTableStatusMutation, UpdateTableStatusMutationVariables>;
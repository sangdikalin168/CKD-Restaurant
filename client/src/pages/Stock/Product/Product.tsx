import { useState } from "react";
import LoadingPage from "../../../components/LoadingPage/LoadingPage"
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { createColumnHelper } from "@tanstack/react-table";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import DataTable from "../../../components/DataTable/DataTable";
import { useCategoryQuery, useProductQuery } from "../../../generated/graphql";
import Notifications from "../../../components/Notification";

type Product = {
    product_id: number
    product_name: string
    price: number
    vip_price: number
    category_name: string
};

const Product = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data, loading, error, refetch } = useProductQuery({ fetchPolicy: "no-cache" });

    const columnHelper = createColumnHelper<Product>();
    const columns = [
        columnHelper.accessor((row) => row.product_id, {
            id: "ID",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.product_id, {
            id: "រូបភាព",
            cell: (info) =>
                <img className="h-12 w-12 object-cover flex-none rounded-full bg-gray-50" src={`http://localhost:4000/images/products/${info.getValue()}.jpg`} alt="" />,
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.product_name, {
            id: "ឈ្មោះ",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.category_name, {
            id: "ប្រភេទ",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.price, {
            id: "តម្លៃ",
            cell: (info) => <>{info.getValue()}៛</>,
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.vip_price, {
            id: "តម្លៃVIP",
            cell: (info) => <>{info.getValue()}៛</>,
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.product_id, {
            id: "Action",
            cell: (info) => (
                <div className="flex">
                    {
                        <>
                            <span className="hidden sm:block">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => {
                                        setShowUpdate(!showUpdate);
                                        const product_id = info.row.original.product_id
                                        setSelectedItem(data?.Product.find(item => item.product_id === product_id))
                                    }}
                                >
                                    <PencilIcon
                                        className="h-4 w-4 text-gray-500"
                                        aria-hidden="true"
                                    />
                                </button>
                            </span>
                        </>
                    }
                </div>
            ),
            header: () => <span>Action</span>,
            footer: (info) => info.column.id,
        }),
    ];

    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const { data: category, loading: loading_category } = useCategoryQuery({ fetchPolicy: "no-cache" });
    const isExistCategory = () => {
        if (category?.Category.length > 0) {
            setShowCreate(!showCreate);
        } else {
            Notifications("សូមបង្កើតប្រភេទជាមុនសិន!!!", "info")
        }
    }
    const add_button = (
        <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500"
            onClick={isExistCategory}
        >
            <PlusCircleIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
            Add
        </button>
    );


    const [selectedItem, setSelectedItem] = useState();

    if (loading) return <LoadingPage />
    if (error) return <div>{error.message}</div>

    return (
        <>
            {
                isLoading ? <LoadingPage /> :
                    <>
                        {showCreate ? (
                            <CreateProduct setShow={setShowCreate} refetch={refetch} />
                        ) : null}
                        {
                            showUpdate ? <UpdateProduct setShow={setShowUpdate} refetch={refetch} selectedItem={selectedItem} /> : null
                        }
                        <DataTable
                            columns={columns}
                            data={data?.Product}
                            button={add_button}
                        />
                    </>
            }

        </>
    )
}

export default Product
import { useState } from "react"
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { CreateSubCategory } from "./CreateSubCategory";
import { UpdateSubCategory } from "./UpdateSubCategory";
import { useCategoryQuery, useSubCategoryQuery } from "../../../generated/graphql";
import Notifications from "../../../components/Notification";

type SubCategory = {
    subcategory_id: number;
    subcategory_name: string;
    category_name: string;
};

export const SubCategory = () => {
    const { data, loading, refetch } = useSubCategoryQuery({ fetchPolicy: "no-cache" });
    
    const [selectedItem, setSelectedItem] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const columnHelper = createColumnHelper<SubCategory>();
    const columns = [
        columnHelper.accessor((row) => row.subcategory_id, {
            id: "ID",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.subcategory_name, {
            id: "Sub Category",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.category_name, {
            id: "Category",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor((row) => row.subcategory_id, {
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
                                        const id = info.row.original.subcategory_id
                                        setSelectedItem(data?.SubCategory.find(item => item.subcategory_id === id))
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

    if (loading) return <LoadingPage />

    return (
        <>
            {
                isLoading ? <LoadingPage /> :
                    <>
                        {showCreate ? (
                            <CreateSubCategory setShow={setShowCreate} refetch={refetch} />
                        ) : null}
                        {
                            showUpdate ? <UpdateSubCategory setShow={setShowUpdate} refetch={refetch} selectedItem={selectedItem} /> : null
                        }
                        <DataTable
                            columns={columns}
                            data={data?.SubCategory}
                            button={add_button}
                        />
                    </>
            }

        </>
    )
}

export default SubCategory



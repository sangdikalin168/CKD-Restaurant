import { useState } from "react"
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { CreateCategory } from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import { useCategoryQuery } from "../../../generated/graphql";

type Category = {
  category_id: number;
  category_name: string;
};

export const Category = () => {

  const { data, loading, refetch } = useCategoryQuery({ fetchPolicy: "no-cache" });
  const [selectedItem, setSelectedItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const columnHelper = createColumnHelper<Category>();
  const columns = [
    columnHelper.accessor((row) => row.category_id, {
      id: "ID",
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
    columnHelper.accessor((row) => row.category_id, {
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
                    const id = info.row.original.category_id
                    setSelectedItem(data?.Category.find(item => item.category_id === id))
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
  const add_button = (
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500"
      onClick={() => setShowCreate(!showCreate)}
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
              <CreateCategory setShow={setShowCreate} refetch={refetch} />
            ) : null}
            {
              showUpdate ? <UpdateCategory setShow={setShowUpdate} refetch={refetch} selectedItem={selectedItem} /> : null
            }
            <DataTable
              columns={columns}
              data={data?.Category}
              button={add_button}
            />
          </>
      }

    </>
  )
}

export default Category

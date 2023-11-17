import { PencilIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import DataTable from "../../components/DataTable/DataTable";
import {
  useCreateCustomerMutation,
  useGetCustomersQuery,
} from "../../generated/graphql";
import CreateMember from "./CreateMember";
import JWTManager from "../../utils/jwt";
import MemberProfile from "./Profile/MemberProfile/MemberProfile";
import { TypeOptions, toast } from "react-toastify";

const notify = (
  message: string,
  auto_Close: boolean | number,
  toastType: TypeOptions
) => {
  if (!toast.isActive("alert")) {
    toast(message, {
      autoClose: auto_Close ? 1000 : false,
      toastId: "alert",
      type: toastType,
    });
  }
};

type Customer = {
  customer_id: number;
  created_date: string;
  created_by: number;
  customer_code: string;
  customer_name: string;
  phone: string;
  gender: string;
  image_path: string;
  fingerprint: string;
  end_membership_date: string;
  coupon_remain_qty: number;
  key_status: string;
  towel_status: string;
};

export const Member = () => {
  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.accessor((row) => row.customer_id, {
      id: "ID",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.customer_name, {
      id: "Name",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "Phone",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.customer_id, {
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
                    setShowProfile(!showProfile);
                    setCustomerID(info.row.original.customer_id);
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

  const [customer_id, setCustomerID] = useState(0);
  const [loading, setLoading] = useState();
  const [data_table, setData_table] = useState<Customer[]>(() => []);
  const {
    data,
    loading: member_loading,
    refetch,
  } = useGetCustomersQuery({ fetchPolicy: "no-cache" });
  const [createCustomer] = useCreateCustomerMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = async (data: any) => {
    // Process and insert the data using an API call or perform any necessary actions
    const { data: result } = await createCustomer({
      variables: {
        customerName: data.customer_name,
        phone: data.phone,
        gender: data.gender,
        createdBy: JWTManager.getUserId() as number,
      },
    });

    if (result?.CreateCustomer.success) {
      notify("Created Succes", true, toast.TYPE.SUCCESS);
      setShowCreate(false);
      refetch();
    }
    notify(result?.CreateCustomer.message, true, toast.TYPE.INFO);
  };

  useEffect(() => {
    if (data) {
      setData_table(data.GetCustomers);
    }
  }, [data]);
  return (
    <>
      {!member_loading ? (
        <div>
          {showCreate && (
            <CreateMember setShow={setShowCreate} onSubmit={handleSubmit} />
          )}
          {showProfile && <MemberProfile ID={customer_id} />}
          {!showProfile && (
            <DataTable
              columns={columns}
              data={data_table}
              button={add_button}
            />
          )}
        </div>
      ) : (
        <LoadingPage message={"Loading"} />
      )}
    </>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment, useEffect, useRef, useState } from "react";
import DataTable from "../../Component/DataTable";
import {
  useCreateCustomerPaymentMutation,
  useGetMemberPriceTableQuery,
} from "../../../../generated/graphql";

import { TypeOptions, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { MemberInvoice } from "../../../../components/ComponentToPrint/MemberInvoice";

const notify = (
  message: string,
  auto_Close: boolean | number,
  toastType: TypeOptions
) => {
  if (!toast.isActive("alert")) {
    toast(message, {
      autoClose: auto_Close ? 500 : false,
      toastId: "alert",
      type: toastType,
    });
  }
};

type PriceTable = {
  id: number;
  name: string;
  age: string;
  member_type: string;
  month_qty: number;
  price: number;
  shift: string;
};
const datetime_format = (date_time: Date) => {
  const date = new Date(date_time);
  return date.toLocaleDateString("fr-CA") + " " + date.toLocaleTimeString();
};

const date_format = (date_time: Date) => {
  const date = new Date(date_time);
  return date.toLocaleDateString("fr-CA");
};

export const RenewForm = (props) => {
  const columnHelperPriceTable = createColumnHelper<PriceTable>();
  const columns_price_table = [
    columnHelperPriceTable.accessor((row) => row.name, {
      id: "ឈ្មោះ Promotion",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.age, {
      id: "វ័យ",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.member_type, {
      id: "សមាជិក",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.month_qty, {
      id: "ចំនួនខែ",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.shift, {
      id: "វេន",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.price, {
      id: "តម្លៃ",
      cell: (info) => info.getValue(),
      header: (info) => <span>{info.column.id}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelperPriceTable.accessor((row) => row.id, {
      id: "Action",
      cell: (info) => (
        <div className="flex">
          {
            <>
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    setIsShowConfirmModal(true);
                    const row = info.row.original;
                    setMonthQty(row.month_qty);
                    setPromotion(row.name);
                    setPrice(row.price);
                    setShift(row.shift);
                  }}
                >
                  <CurrencyDollarIcon
                    className="h-4 w-4 text-green-500 hover:bg-red-500"
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

  const { data: price_table, loading } = useGetMemberPriceTableQuery({
    fetchPolicy: "no-cache",
  });

  const cancelButtonRef = useRef(null);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [member_price_table, setMemberPriceTable] = useState([]);

  const [month_qty, setMonthQty] = useState(1);
  const [shift, setShift] = useState("Full");
  const [price, setPrice] = useState(0);
  const [age, setAge] = useState("ចាស់");
  const [promotion, setPromotion] = useState("");


  const FilterPrice = () => {
    const result = price_table?.GetMemberPriceTable.filter(
      (p) => p.month_qty == month_qty && p.shift == shift && p.age == age
    );
    return result
  };

  useEffect(() => {
    if (price_table?.GetMemberPriceTable) {
      setMemberPriceTable(FilterPrice())
    }
  }, [month_qty, shift, age, price_table])


  return (
    <>
      <Transition.Root show={props.open_member} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setOpenMember}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          តារាងតម្លៃសមាជិក
                        </Dialog.Title>
                        <div className="mt-2">
                          {!isShowConfirmModal ? (
                            <>
                              <div className="flex space-x-6">
                                <div className="space-x-2">
                                  <button
                                    type="button"
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setAge("ចាស់"); }}
                                  >
                                    ចាស់
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setAge("ក្មេង"); }}
                                  >
                                    ក្មេង
                                  </button>
                                </div>

                                <div className="space-x-2">
                                  <button
                                    type="button"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setShift("Full") }}
                                  >
                                    Full
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setShift("Morning") }}
                                  >
                                    Morning
                                  </button>
                                </div>

                                <div className="space-x-2">
                                  <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setMonthQty(1); }}
                                  >
                                    1ខែ
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setMonthQty(1.5); }}
                                  >
                                    1.5ខែ
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setMonthQty(3); }}
                                  >
                                    3ខែ
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setMonthQty(6) }}
                                  >
                                    6ខែ
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { setMonthQty(12) }}
                                  >
                                    12ខែ
                                  </button>
                                </div>
                              </div>

                              {!loading ? (
                                <DataTable
                                  columns={columns_price_table}
                                  data={member_price_table}
                                />
                              ) : (
                                <div>Loading...</div>
                              )}
                            </>
                          ) : (
                            <>
                              <ConfirmModal
                                setIsShowConfirmModal={setIsShowConfirmModal}
                                old_end={props.details?.end_membership_date}
                                month_qty={month_qty}
                                promotion={promotion}
                                shift={shift}
                                price={price}
                                customer_id={props.details?.customer_id}
                                user_id={parseInt(
                                  localStorage.getItem("user_id")
                                )}
                                customer_name={props.details?.customer_name}
                                phone={props.details?.phone}
                                refetchMemberDetail={props.refetchMemberDetail}
                                refetch={props.refechMemberPayment}
                                setOpenMember={props.setOpenMember}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        props.setOpenMember(false);
                        setIsShowConfirmModal(false);
                      }}
                    >
                      បោះបង់
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const ConfirmModal = (props: any) => {
  const getRenewalDate = (effectiveDate: Date, month_qty: number) => {
    // Get the current date.
    if (month_qty == 1.5) {
      const today = new Date();
      let duration = 0;
      if (effectiveDate < today) {
        duration = today.getMonth() - today.getMonth() + 1;
        // Add the duration to the effective date to get the next renewal date.
        const renewalDate = new Date(today);
        renewalDate.setDate(renewalDate.getDate() + 15);
        renewalDate.setMonth(renewalDate.getMonth() + duration);
        //renewalDate.setFullYear(renewalDate.getFullYear() + duration / 12);
        return renewalDate;
      } else {
        duration = today.getMonth() - effectiveDate.getMonth() + month_qty;
        // Add the duration to the effective date to get the next renewal date.
        const renewalDate = new Date(effectiveDate);
        renewalDate.setDate(renewalDate.getDate() + 15);
        renewalDate.setMonth(renewalDate.getMonth() + month_qty);
        //renewalDate.setFullYear(renewalDate.getFullYear() + month_qty / 12);
        return renewalDate;
      }
    }

    const today = new Date();
    let duration = 0;
    if (effectiveDate < today) {
      duration = today.getMonth() - today.getMonth() + month_qty;
      // Add the duration to the effective date to get the next renewal date.
      const renewalDate = new Date(today);
      renewalDate.setMonth(renewalDate.getMonth() + duration);
      //renewalDate.setFullYear(renewalDate.getFullYear() + duration / 12);
      return renewalDate;
    } else {
      duration = today.getMonth() - effectiveDate.getMonth() + month_qty;
      // Add the duration to the effective date to get the next renewal date.
      const renewalDate = new Date(effectiveDate);
      renewalDate.setMonth(renewalDate.getMonth() + month_qty);
      //renewalDate.setFullYear(renewalDate.getFullYear() + month_qty / 12);
      return renewalDate;
    }
  };

  const effectiveDate = new Date(props.old_end);
  const renewalDate = getRenewalDate(effectiveDate, props.month_qty);
  const [createMemberPayment] = useCreateCustomerPaymentMutation();

  const [payment_id, setPaymentID] = useState(0);

  const handleSubmit = async () => {
    const result = await createMemberPayment({
      variables: {
        monthQty: props.month_qty,
        shift: props.shift,
        newEnd: date_format(renewalDate),
        oldEnd: props.old_end,
        price: props.price,
        promotion: props.promotion,
        customerId: props.customer_id,
        userId: props.user_id,
      },
    });

    if (result.data?.CreateCustomerPayment.success) {
      setPaymentID(result.data.CreateCustomerPayment.payment_id);
      notify("Success", true, "success");
      props.refetch();
      props.refetchMemberDetail();
      props.setOpenMember(false);
      return;
    }
    notify("Failed", true, "error");
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint1 = async (target: HTMLIFrameElement) => {
    return new Promise(() => {
      console.log("forwarding print request to the main process...");
      const data = target.contentWindow.document.documentElement.outerHTML;
      const blob = new Blob([data], { type: "text/html; charset=utf-8" });
      const url = URL.createObjectURL(blob);
      window.electronAPI.printComponent(url, (response: any) => {
        console.log("Main: ", response);
      });
      // console.log('Main: ', data);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    print: async (printIframe: HTMLIFrameElement) => {
      // Do whatever you want here, including asynchronous work
      await handlePrint1(printIframe);
    },
  });
  const buttonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // This function will be called after the component re-renders
    if (payment_id > 0) {
      buttonRef.current.click();
      props.setIsShowConfirmModal(false);
    }
  }, [payment_id]);

  return (
    <>
      <button
        className="hidden"
        ref={buttonRef}
        type="button"
        onClick={handlePrint}
      >
        Print
      </button>
      <p className="text-lg font-semibold leading-6 text-gray-900">
        សុពលភាពចាស់: {props.old_end}
      </p>
      <p className="text-lg font-semibold leading-6 text-gray-900 mb-2 ">
        ថ្ងៃបង់ប្រាក់បន្ទាប់: {date_format(renewalDate)}
      </p>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        onClick={() => props.setIsShowConfirmModal(false)}
      >
        បោះបង់
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        onClick={handleSubmit}
      >
        យល់ព្រម
      </button>

      <div className="hidden1">
        <MemberInvoice
          ref={componentRef}
          invoice_id={payment_id}
          payment_date={datetime_format(new Date())}
          cashier={localStorage.getItem("display_name")}
          c_name={props.customer_name}
          phone={props.phone}
          promotion={props.promotion}
          price={props.price}
          old_end={props.old_end}
          new_end={date_format(renewalDate)}
          shift={props.shift}
        />
      </div>
    </>
  );
};

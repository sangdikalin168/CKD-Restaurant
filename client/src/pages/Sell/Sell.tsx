import { useEffect, useRef, useState } from "react";
import { Pos } from "./Pos";
import { useBillingLazyQuery, usePaymentByTableIdLazyQuery, useTablesLazyQuery, useUpdatePaymentMutation, useUpdateTableStatusMutation } from "../../generated/graphql";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BillingInvoice } from "../../components/ComponentToPrint/BillingInvoice";
import { useReactToPrint } from "react-to-print";
import { PaidInvoice } from "../../components/ComponentToPrint/PaidInvoice";
import Notifications from "../../components/Notification";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Sell() {
  const [show_pos, setShowPOS] = useState(false);
  const [isTableMode, setIsTableMode] = useState(false);
  const [table_id, setTableID] = useState(0);
  const [table_name, setTableName] = useState("");
  const [status, setTableStatus] = useState("");
  const invoiceRef = useRef<HTMLDivElement>(null);
  const paidInvoiceRef = useRef<HTMLDivElement>(null);

  const [getTables, { data }] = useTablesLazyQuery({ fetchPolicy: "no-cache" })
  const [getBilling, { data: bill_data }] = useBillingLazyQuery({ fetchPolicy: "no-cache" })
  const [updateTable] = useUpdateTableStatusMutation();
  const [updatePayment] = useUpdatePaymentMutation()

  const subTotal = (cart) => {
    return cart.reduce((total: number, cartItem) => {
      const item = cart.find(
        i => i.product_id === cartItem.product_id
      )
      return total + (item?.unit_price || 0) * cartItem.quantity
    }, 0)
  }

  const PrintBill = async (table_id: number, status: string) => {
    if (status === "Available") {
      return;
    }
    await getBilling({ variables: { tableId: table_id } });
    handlePrintInvoice();
  }

  const Paid = async (table_id: number, status: string) => {
    if (status === "Available") {
      return;
    }

    const res = await getBilling({ variables: { tableId: table_id } });
    handlePrintPaidInvoice();

    //TODO: Update Payment Status and Update Table Status

    await updateTable({ variables: { tableId: table_id, status: "Available" } })

    await updatePayment({
      variables: {
        paymentStatus: "Paid",
        paymentMethod: "Cash",
        grandTotal: subTotal(res.data?.Billing.items),
        discount: 0,
        totalAmount: subTotal(res.data?.Billing.items),
        paymentBy: 1,
        paymentId: res.data?.Billing.payment_id
      }
    })

    await getTables();

    Notifications("ជោគជ័យ", "success")
  }

  const handlePrintPaidInvoice = useReactToPrint({
    content: () => paidInvoiceRef.current,
  })

  const handlePrintInvoice = useReactToPrint({
    content: () => invoiceRef.current,
    // onAfterPrint: () => {
    //   onLeavePosPage();
    // }
  })

  const RenderContent = () => {
    if (show_pos) {
      return <Pos setShowPOS={setShowPOS} isTableMode={isTableMode} table_name={table_name} table_id={table_id} status={status} />
    }
    return (
      <>
        <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-12 xl:gap-x-3">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <button
              className="text-3xl bg-cyan-600 text-white hover:bg-red-400"
              onClick={() => { setShowPOS(true); setIsTableMode(false) }}
            >
              ខ្ចប់
            </button>
          </div>
          {
            data?.Tables.map((item) => (
              <div className="grid" key={item.table_id}>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Option
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => { PrintBill(item.table_id, item.status); setTableName(item.table_name) }}
                            >
                              ចេញវិក័យប័ត្រ
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => { Paid(item.table_id, item.status); setTableName(item.table_name) }}
                            >
                              បានទទួលលុយរួច
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <button
                    className={`text-3xl hover:bg-red-400 ${item.status == "Available" ? "bg-green-500" : "bg-red-500"}`}
                    onClick={() => {
                      setIsTableMode(true);
                      setShowPOS(true);
                      setTableID(item.table_id);
                      setTableName(item.table_name);
                      setTableStatus(item.status)
                    }}
                  >
                    {item.table_name}
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </>
    )
  }

  useEffect(() => {
    getTables();
  }, [show_pos]);

  return (
    <div className="">
      <div className="mx-auto">
        <h2 className="sr-only">Products</h2>
        {
          RenderContent()
        }
        <div className="hidden">
          <BillingInvoice
            ref={invoiceRef}
            invoice_id={bill_data?.Billing.payment_id}
            queue_number={0}
            table_number={table_name}
            payment_date={new Date()}
            cashier={"Admin"}
            cartItems={bill_data?.Billing?.items || []}
            discount={0}
          />
        </div>

        <div className="hidden">
          <PaidInvoice
            ref={paidInvoiceRef}
            invoice_id={bill_data?.Billing.payment_id}
            queue_number={0}
            table_number={table_name}
            payment_date={new Date()}
            cashier={"Admin"}
            cartItems={bill_data?.Billing?.items || []}
            discount={0}
          />
        </div>
      </div>
    </div>
  );
}


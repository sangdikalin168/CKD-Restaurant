/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Dialog, Transition } from "@headlessui/react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment, useEffect, useRef, useState } from "react";
import DataTable from "../../Component/DataTable";
import { useCreateTrainningPaymentMutation, useGetTranningPriceQuery } from "../../../../generated/graphql";
import { TypeOptions, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { CouponInvoice } from "../../../../components/ComponentToPrint/CouponInvoice";

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

const date_time_format = (date_time: Date) => {
    const date = new Date(date_time);
    return date.toLocaleDateString("fr-CA");
}

type PriceTable = {
    id: number;
    name: string;
    type: string;
    month_qty: number;
    price: number;
};

export const TrainingPaymentForm = ((props) => {

    const columnHelperPriceTable = createColumnHelper<PriceTable>();
    const columns_price_table = [
        columnHelperPriceTable.accessor((row) => row.name, {
            id: "ឈ្មោះ Promotion",
            cell: (info) => info.getValue(),
            header: (info) => <span>{info.column.id}</span>,
            footer: (info) => info.column.id,
        }),
        columnHelperPriceTable.accessor((row) => row.type, {
            id: "ប្រភេទ",
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
                                        setType(row.type);
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

    const cancelButtonRef = useRef(null);

    const { data, loading: loading_price_table, refetch } = useGetTranningPriceQuery({ fetchPolicy: 'network-only' })
    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [month_qty, setMonthQty] = useState(0);
    const [promotion, setPromotion] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");

    return (
        <>
            <Transition.Root show={props.open_trainning} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpenTrainning}>
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
                                                <div className="mt-2">
                                                    {!isShowConfirmModal ? <DataTable columns={columns_price_table} data={data?.GetTranningPrice} /> :
                                                        <>
                                                            <ConfirmModal
                                                                setIsShowConfirmModal={setIsShowConfirmModal}
                                                                month_qty={month_qty}
                                                                promotion={promotion}
                                                                price={price}
                                                                customer_id={props.customer_id}
                                                                user_id={parseInt(localStorage.getItem("user_id"))}
                                                                customer_name={props.customer_name}
                                                                phone={props.phone}
                                                                type={type}
                                                                refetch={props.refetch_trainning_payment}
                                                                setOpenTrainning={props.setOpenTrainning}
                                                            />
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => { props.setOpenTrainning(false); setIsShowConfirmModal(false) }}
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
});

const ConfirmModal = ((props) => {

    const [createTrainningPayment] = useCreateTrainningPaymentMutation();

    const [payment_id, setPaymentID] = useState(0);

    const handleSubmit = async () => {
        const result = await createTrainningPayment({
            variables: {
                price: props.price,
                promotion: props.promotion,
                customerId: props.customer_id,
                userId: props.user_id,
                type: props.type
            }
        })

        if (result.data?.CreateTrainningPayment.success) {
            setPaymentID(result.data.CreateTrainningPayment.payment_id);
            notify("Success", true, "success");
            props.refetch();
            props.setOpenTrainning(false);
            return;
        }
        notify("Failed", true, "error")
    }

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint1 = async (target: HTMLIFrameElement) => {
        return new Promise(() => {
            console.log('forwarding print request to the main process...');
            const data = target.contentWindow.document.documentElement.outerHTML;
            const blob = new Blob([data], { type: 'text/html; charset=utf-8' });
            const url = URL.createObjectURL(blob);
            window.electronAPI.printComponent(url, (response: any) => {
                console.log('Main: ', response);
            });
            // console.log('Main: ', data);

            props.setIsShowConfirmModal(false);
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
        }
    }, [payment_id]);

    return (
        <>
            <button className="hidden" ref={buttonRef} type="button" onClick={handlePrint}>Print</button>
            <div className='hidden1'>
                <CouponInvoice ref={componentRef}
                    invoice_id={payment_id}
                    payment_date={date_time_format(new Date())}
                    cashier={localStorage.getItem("display_name")}
                    c_name={props.customer_name}
                    phone={props.phone}
                    promotion={props.promotion}
                    price={props.price}
                />
            </div>

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
        </>
    );
})
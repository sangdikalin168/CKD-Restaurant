import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
    useUpdateCustomerMutation,
} from "../../../../generated/graphql";

import { TypeOptions, toast } from "react-toastify";


const notify = (
    message: string,
    auto_Close: boolean | number,
    toastType: TypeOptions
) => {
    if (!toast.isActive("alert")) {
        toast(message, {
            autoClose: auto_Close ? 1500 : false,
            toastId: "alert",
            type: toastType,
        });
    }
};


export const UpdateProfile = (props) => {

    const cancelButtonRef = useRef(null);
    const [phone, setPhone] = useState("");

    const [updateCustomer] = useUpdateCustomerMutation();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const result = await updateCustomer({
            variables: {
                phone: phone,
                customerId: props.customer_id
            },
        });

        if (result.data?.UpdateCustomer.success) {
            notify("Success", true, "success");
            props.refetch();
            props.setOpen(false);
            return;
        }
        notify("Failed: " + result.data?.UpdateCustomer.message, 5000, "error");
        props.setOpen(false);
        props.refetch();

    };
    return (
        <>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={props.setOpen}
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
                                                    សូមពិនិត្យលេខទូរស័ព្ទ
                                                </Dialog.Title>
                                                <form onSubmit={handleSubmit} id="update_form">
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            required
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            form="update_form"
                                            className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            យល់ព្រម
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                props.setOpen(false);
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

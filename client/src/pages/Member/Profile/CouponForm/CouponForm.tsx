import { Fragment, useEffect, useRef, useState } from "react";
import {
  useCreateCouponPaymentMutation,
  useGetCouponCardLazyQuery,
} from "../../../../generated/graphql";
import { useReactToPrint } from "react-to-print";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CouponInvoice } from "../../../../components/ComponentToPrint/CouponInvoice";
import { TypeOptions, toast } from "react-toastify";

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

export const CouponPayment = (props: any) => {
  const cancelButtonRef = useRef(null);
  //const buttonRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const inputEl = useRef(null);

  const [findCouponCard, { data, loading, refetch }] =
    useGetCouponCardLazyQuery({ fetchPolicy: "no-cache" });

  const FindCoupon = async (code: string) => {
    await findCouponCard({
      variables: {
        couponCode: code,
      },
    });
    inputEl.current.select();
  };

  const [coupon_code, setCouponCode] = useState("");
  const [payment_id, setPaymentID] = useState(0);

  const [createCouponPayment] = useCreateCouponPaymentMutation();

  const CreateCouponPayment = async () => {
    const result = await createCouponPayment({
      variables: {
        userId: props.user_id,
        customerId: props.customer_id,
        cardName: data?.GetCouponCard[0].card_name,
        price: data?.GetCouponCard[0].price,
        quantity: data?.GetCouponCard[0].quantity,
        couponCode: coupon_code,
      },
    });

    if (result.data?.CreateCouponPayment.success) {
      props.setIsOpenCoupon(false);
      setPaymentID(result.data.CreateCouponPayment.payment_id);
      return;
    }

    notify("Coupon Payment Error", true, "error");
  };

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

  const date_time_format = (date_time: Date) => {
    const date = new Date(date_time);
    return date.toLocaleDateString("fr-CA");
  };

  useEffect(() => {
    // This function will be called after the component re-renders
    if (payment_id > 0) {
      buttonRef.current?.click();
      refetch();
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
      <Transition.Root show={props.open_coupon} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setIsOpenCoupon}
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
                        <div className="mt-2">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              សូមបញ្ចុលលេខកូដគូប៉ុន
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                required
                                ref={inputEl}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            className="mt-2 flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => FindCoupon(coupon_code)}
                          >
                            {" "}
                            <MagnifyingGlassIcon className="h-5 w-5" />
                            ស្វែងរក
                          </button>

                          <div>
                            {!loading && data ? (
                              <>
                                {data.GetCouponCard.length > 0 ? (
                                  <>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                      Card Name:{" "}
                                      {data?.GetCouponCard[0].card_name}
                                    </p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                      តម្លៃ: {data?.GetCouponCard[0].price}$
                                    </p>
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                      onClick={() => CreateCouponPayment()}
                                    >
                                      លក់
                                    </button>
                                  </>
                                ) : (
                                  <div>Coupon Not Found!!!</div>
                                )}
                              </>
                            ) : (
                              <div>Loading...</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        props.setIsOpenCoupon(false);
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

      <div className="hidden">
        <div>
          {!loading && data ? (
            <>
              {data.GetCouponCard.length > 0 ? (
                <>
                  <CouponInvoice
                    ref={componentRef}
                    invoice_id={payment_id}
                    payment_date={date_time_format(new Date())}
                    cashier={localStorage.getItem("display_name")}
                    c_name={props.customer_name}
                    phone={props.phone}
                    promotion={data?.GetCouponCard[0].card_name || "null"}
                    price={data?.GetCouponCard[0].price || "null"}
                  />
                </>
              ) : (
                <div>Coupon Not Found!!!</div>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

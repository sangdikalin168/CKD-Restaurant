import { Fragment, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Dialog, Transition } from "@headlessui/react";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useCategoryQuery, useCreateOrderDetailMutation, useCreateOrderMutation, useCreatePaymentMutation, usePaymentByTableIdLazyQuery, usePaymentByTableIdQuery, useProductQuery, useUpdateTableStatusMutation } from "../../generated/graphql";
import { ClipboardDocumentCheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Invoice } from "../../components/ComponentToPrint/Invoice";
import { BiCheckCircle, BiEdit } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import Notifications from "../../components/Notification";
import { OrderInvoice } from "../../components/ComponentToPrint/OrderInvoice";
import { KitchenInvoice } from "../../components/ComponentToPrint/KitchenInvoice";
import addedSound from '../../assets/sounds/added_to_cart.mp3'
import useSound from 'use-sound'

type CartItem = {
    product_id: number
    quantity: number
    product_name: string
    unit_price: number
    description: string
    item_type: string
    order_id: number
}

export const Pos = ({ setShowPOS, isTableMode, table_name, table_id, status }: any) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    const [product_id, setProductID] = useState(0);

    const addItemToCart = (id: number, name: string, price: number, item_type: string) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.product_id == id) == null) {
                return [...currItems, { product_id: id, quantity: 1, product_name: name, unit_price: price, description: "", item_type: item_type, order_id: 0 }]
            } else {
                return currItems.map(item => {
                    if (item.product_id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.product_id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.product_id === id)?.quantity === 1) {
                return currItems.filter(item => item.product_id !== id)
            } else {
                return currItems.map(item => {
                    if (item.product_id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.product_id !== id)
        })
    }

    const getItem = (id: number, description: string) => {
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.product_id === id) {
                    return { ...item, description: description }
                } else {
                    return item
                }
            })
        })

        setOpen(false)
    }

    const onLeavePosPage = () => {
        (document.getElementById("showOrHideMenuButton") as HTMLElement).classList.remove("hidden");
        // setShowPOS(false);
        localStorage.removeItem("shopping-cart");
    }

    const saveCartToDb = async () => {

        if (status === "Available") {
            //TODO: Update Table Status To Occupied
            const result = await updateTableStatus({ variables: { tableId: table_id, status: "Occupied" } })

            //TODO 1.Create Payment
            const { data } = await createPayment({
                variables: {
                    paymentMethod: "Cash",
                    paymentStatus: "Pending",
                    grandTotal: 0,
                    discount: 0,
                    totalAmount: 0,
                    paymentBy: 1,
                }
            })

            //TODO 2.Create Order
            if (data?.CreatePayment.success !== true) {
                Notifications(data?.CreatePayment.message, "error");
                return;
            }

            const order_res = await createOrder({
                variables: {
                    tableId: table_id,
                    orderType: "dine_in",
                    subTotal: subTotal(),
                    orderBy: 1,
                    paymentId: data?.CreatePayment.payment_id,
                }
            })

            if (order_res.data?.CreateOrder.success !== true) {
                Notifications(order_res.data?.CreateOrder.message, "error");
                return;
            }

            const updatedItemsCopy = [...cartItems];

            // Update order_id
            updatedItemsCopy.forEach((item) => {
                item.order_id = order_res.data?.CreateOrder.order_id;
            });
            // Set the updated items back to the state
            setCartItems(updatedItemsCopy);
            const orderDetail_res = await createOrderDetail({
                variables: {
                    object: cartItems
                }
            })

            Notifications("Success", "success")
            handlePrintInvoice();
            onLeavePosPage()
        } else {
            //TODO Get Payment ID By Table ID
            const { data } = await getPaymentId({ variables: { tableId: table_id } });

            const order_res = await createOrder({
                variables: {
                    tableId: table_id,
                    orderType: "dine_in",
                    subTotal: subTotal(),
                    orderBy: 1,
                    paymentId: data?.PaymentByTableID.payment_id,
                }
            })

            if (order_res.data?.CreateOrder.success !== true) {
                Notifications(order_res.data?.CreateOrder.message, "error");
                return;
            }
            const updatedItemsCopy = [...cartItems];

            // Update order_id
            updatedItemsCopy.forEach((item) => {
                item.order_id = order_res.data?.CreateOrder.order_id;
            });
            // Set the updated items back to the state
            setCartItems(updatedItemsCopy);
            const orderDetail_res = await createOrderDetail({
                variables: {
                    object: cartItems
                }
            })

            Notifications("Success", "success")
            handlePrintInvoice();
            onLeavePosPage()
        }
    }

    const [getPaymentId] = usePaymentByTableIdLazyQuery({ fetchPolicy: "no-cache" })
    const [updateTableStatus] = useUpdateTableStatusMutation();
    const [createPayment] = useCreatePaymentMutation();
    const [createOrder] = useCreateOrderMutation();
    const [createOrderDetail] = useCreateOrderDetailMutation();
    const [invoice_id, setInvoiceID] = useState(0)
    const [queue_number, setQueueNumber] = useState(0)
    const [order_id, setOrderID] = useState(0)

    const [playSound] = useSound(addedSound)

    //Take Away Customer
    const checkOut = async () => {
        //TODO 1.Create Payment
        const { data } = await createPayment({
            variables: {
                paymentMethod: "Cash",
                paymentStatus: "Paid",
                grandTotal: totalAmount() - discount,
                discount: discount,
                totalAmount: totalAmount(),
                paymentBy: 1,
            }
        })

        //TODO 2.Create Order
        if (data?.CreatePayment.success !== true) {
            Notifications(data?.CreatePayment.message, "error");
            return;
        }
        setInvoiceID(data.CreatePayment.payment_id)


        const order_res = await createOrder({
            variables: {
                tableId: 0,
                orderType: "take_away",
                subTotal: subTotal(),
                orderBy: 1,
                paymentId: data?.CreatePayment.payment_id,
            }
        })

        if (order_res.data?.CreateOrder.success !== true) {
            Notifications(order_res.data?.CreateOrder.message, "error");
            return;
        }

        setQueueNumber(order_res.data.CreateOrder.queue_no);
        setOrderID(order_res.data.CreateOrder.order_id)

        const updatedItemsCopy = [...cartItems];

        // Update order_id
        updatedItemsCopy.forEach((item) => {
            item.order_id = order_res.data?.CreateOrder.order_id;
        });
        // Set the updated items back to the state
        setCartItems(updatedItemsCopy);

        const orderDetail_res = await createOrderDetail({
            variables: {
                object: cartItems
            }
        })

        let count = 0
        cartItems.map((value) => {
            if (value.item_type == "cook") {
                count++
                return
            }
        })

        if (count > 0) {
            handlePrintInvoice();
        }
        Notifications("Success", "success")
        onLeavePosPage()


    }

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const { data, loading } = useProductQuery({ fetchPolicy: "no-cache" });
    const { data: category, loading: loading_category } = useCategoryQuery({ fetchPolicy: "no-cache" });
    const [description, setDescription] = useState("")
    const componentRef = useRef<HTMLDivElement>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);

    const [discount, setDiscount] = useState(0);
    const [show_discount, setShowDiscount] = useState(false);
    const [search, setSearch] = useState("")
    const inputRef = useRef(null);

    const subTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            const item = data?.Product.find(i => i.product_id === cartItem.product_id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0)
    }

    const totalAmount = () => {
        return cartItems.reduce((total, cartItem) => {
            const item = data?.Product.find(i => i.product_id === cartItem.product_id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0) - discount
    }

    const handlePrintInvoice = useReactToPrint({
        content: () => invoiceRef.current,
        print: async (printIframe: HTMLIFrameElement) => {
            // Do whatever you want here, including asynchronous work
            await handleSendToPrinter(printIframe);
        },
    })

    const handleSendToPrinter = async (target: HTMLIFrameElement) => {
        return new Promise(() => {
            console.log("forwarding print request to the main process...");
            const data = target.contentWindow.document.documentElement.outerHTML;
            const blob = new Blob([data], { type: "text/html; charset=utf-8" });
            const url = URL.createObjectURL(blob);
            window.electronAPI.printToElectron(url, 1, (response: any) => {
                console.log("Main: ", response);
            });
            onLeavePosPage();
        });
    };

    const handleTrack = () => {
        if (search.length !== 0) {
            // Do something with value
            const product = data?.Product.find(val => val.product_id === Number(search))
            if (product === undefined) {
                Notifications("មិនមានទំនិញនេះទេ", "error")
                inputRef.current.select()
                return
            }
            setSearch("")
            playSound()
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleTrack();
        }
    };

    useEffect(() => {
        // (document.getElementById("showOrHideMenuButton") as HTMLElement).classList.add("hidden");
        // (document.getElementById("sidebar") as HTMLElement).classList.add("hidden");
        (document.getElementById("showOrHideMenuButton") as HTMLElement).classList.remove("hidden");
        localStorage.removeItem("shopping-cart");
    }, [])

    if (loading) return (<LoadingPage />);

    return (
        <div className="h-full">
            <div className="rounded-md shadow-sm flex gap-x-2">
                <input
                    className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 bor ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="ស្វែងរក..."
                    name="search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyPress={handleKeyPress}
                    autoComplete="off"
                    ref={inputRef}
                    autoFocus
                />

                {/* Horizontal Scrollable Category List */}
                <div className="mt-2 overflow-x-auto">
                    <div className="flex gap-2 whitespace-nowrap">
                        {loading_category ? (
                            <div>Loading....</div>
                        ) : (
                            category?.Category.map((item) => (
                                <button
                                    key={item.category_id}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {item.category_name}
                                </button>
                            ))
                        )}
                    </div>

                </div>
                {/* {
                    loading_category ? <div>Loading....</div> :
                        category?.Category.map((item) => {
                            return (
                                <button key={item.category_id} className="overflow-hidden text-nowrap py-1.5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    {item.category_name}
                                </button>
                            )
                        })

                } */}
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-4">
                {/* Product grid */}
                <div className="lg:col-span-3 rounded-md bg-white p-3 overflow-y-auto max-h-[calc(100vh-70px)]">
                    <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 xl:gap-x-6">
                        {data?.Product.map((product) => (
                            <a key={product.product_id} className="group" onClick={() => addItemToCart(product.product_id, product.product_name, product.price, product.item_type)}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={`http://localhost:4000/images/products/${product.product_id}.jpg`}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-1 text-sm text-gray-700 truncate whitespace-nowrap overflow-hidden">{product.product_name}</h3>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="sticky top-4 hidden lg:block bg-white rounded-md p-3">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            {cartItems.map((product) => (
                                <li key={product.product_id} className="flex pb-2">
                                    <div className="flex flex-1 flex-col">

                                        <div className="flex flex-1 items-end justify-between">
                                            <h2 className="font-bold text-gray-900">{product.product_name}
                                            </h2>
                                            <h2 className="font-bold text-gray-900">{formatCurrency(product.unit_price)}</h2>
                                        </div>


                                        <div className="flex flex-1 items-end justify-between text-sm mt-1">
                                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                <div className="mx-auto flex h-5 items-stretch text-gray-600">
                                                    <button className="flex items-center justify-center rounded-l bg-gray-200 px-2 transition hover:bg-black hover:text-white" onClick={() => decreaseCartQuantity(product.product_id)}>-</button>
                                                    <div className="flex w-full items-center justify-center bg-gray-100 px-3 text-xs uppercase transition">{product.quantity}</div>
                                                    <button className="flex items-center justify-center rounded-r bg-gray-200 px-2 transition hover:bg-black hover:text-white" onClick={() => increaseCartQuantity(product.product_id)}>+</button>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => removeFromCart(product.product_id)}
                                                >
                                                    <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-600" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-red-600 hover:font-bold"
                                            onClick={() => { setProductID(product.product_id); setOpen(true) }}
                                        >
                                            ផ្សេងៗ: {product.description}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="">
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <p className="text-gray-700">សរុប</p>
                            <p className="text-gray-700">{formatCurrency(subTotal())}</p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex items-center justify-between pb-2">
                            <p className="text-lg font-bold">បញ្ចុះតម្លៃ</p>
                            <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setShowDiscount(true)}
                            >
                                <BiEdit className="h-5 w-5 text-green-600" aria-hidden="true" />
                            </button>
                            {
                                show_discount ? (
                                    <>
                                        <div className="">
                                            <input
                                                value={discount}
                                                autoComplete="off"
                                                type='number'
                                                step="0.1"
                                                min='0'
                                                name="price"
                                                onChange={(e) => setDiscount(Number(e.target.value))}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => setShowDiscount(false)}
                                        >
                                            <BiCheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="">
                                            <p className="mb-1 text-lg font-bold">{formatCurrency(discount)}</p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">សរុបរួម</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">{formatCurrency(totalAmount())}</p>
                            </div>
                        </div>
                        <hr className="my-2" />
                        {
                            cartItems.length > 0 ? (
                                <>
                                    {
                                        isTableMode ? (
                                            <button className="flex w-full py-1.5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={() => saveCartToDb()} >
                                                <ClipboardDocumentCheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true"
                                                />
                                                រក្សារទុក
                                            </button>
                                        ) : (
                                            <button className="flex w-full py-1.5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={() => checkOut()}>
                                                <ClipboardDocumentCheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
                                                គិតលុយ
                                            </button>
                                        )
                                    }
                                </>
                            ) : null

                        }
                        <button className="mt-2 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={onLeavePosPage}>បោះបង់</button>
                    </div>
                </div>

                {/* Add Or Edit Description Modal */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                    <Dialog.Panel className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                            <h3 className="font-bold text-gray-800 dark:text-white">
                                                Modal title
                                            </h3>
                                            <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal">
                                                <span className="sr-only">Close</span>
                                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>

                                        <div className="p-4 overflow-y-auto">
                                            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">បរិយាយ</label>
                                            <input type="text" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="បរិយាយ" autoFocus
                                                onChange={(e) => setDescription(e.target.value)} />
                                        </div>

                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                onClick={() => getItem(product_id, description)}
                                            >
                                                រក្សារទុក
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

            </div>

            <div className="hidden">
                <Invoice
                    ref={invoiceRef}
                    invoice_id={invoice_id}
                    queue_number={queue_number}
                    table_number={table_name}
                    payment_date={new Date()}
                    cashier={"Admin"}
                    cartItems={cartItems}
                    discount={discount}
                    totalAmount={totalAmount()}
                />
            </div>

            <div className="hidden">
                <OrderInvoice
                    ref={componentRef}
                    order_id={order_id}
                    queue_number={0}
                    table_number={table_name}
                    payment_date={new Date()}
                    cashier={"Admin"}
                    cartItems={cartItems}
                    totalAmount={totalAmount()}
                />
            </div>

            <div className="hidden">
                <KitchenInvoice
                    ref={componentRef}
                    queue_number={queue_number}
                    table_number={table_name}
                    payment_date={new Date()}
                    cashier={"Admin"}
                    cartItems={cartItems}
                />
            </div>
        </div>
    )
}
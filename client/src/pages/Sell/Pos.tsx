import { Fragment, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Dialog, Transition } from "@headlessui/react";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useCategoryQuery, useProductQuery } from "../../generated/graphql";
import { ClipboardDocumentCheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Invoice } from "../../components/ComponentToPrint/Invoice";
import { BiCheckCircle, BiEdit } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";

type CartItem = {
    id: number
    quantity: number
    name: string
    price: number
    description: string
    item_type: string
}

export const Pos = ({ setShowPOS, isTableMode }: any) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    const [product_id, setProductID] = useState(0);

    const addItemToCart = (id: number, name: string, price: number, item_type: string) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.id == id) == null) {
                return [...currItems, { id: id, quantity: 1, name: name, price: price, description: "", item_type: item_type }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
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
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
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
            return currItems.filter(item => item.id !== id)
        })
    }

    const getItem = (id: number, description: string) => {
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id) {
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
        setShowPOS(false);
        localStorage.removeItem("shopping-cart");
    }

    const saveCartToDb = () => {
        onLeavePosPage()
    }

    const checkOut = () => {
        handlePrint();
        onLeavePosPage()
        console.log(cartItems);
    }

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const { data, loading } = useProductQuery({ fetchPolicy: "no-cache" });
    const { data: category, loading: loading_category } = useCategoryQuery({ fetchPolicy: "no-cache" });
    const [description, setDescription] = useState("")
    const componentRef = useRef<HTMLDivElement>(null);

    const [discount, setDiscount] = useState(0);
    const [show_discount, setShowDiscount] = useState(false);
    const totalAmount = () => {
        return cartItems.reduce((total, cartItem) => {
            const item = data?.Product.find(i => i.product_id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0) - discount
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    useEffect(() => {
        (document.getElementById("showOrHideMenuButton") as HTMLElement).classList.add("hidden");
        (document.getElementById("sidebar") as HTMLElement).classList.add("hidden");
    }, [])

    if (loading) return (<LoadingPage />);

    return (
        <div className="h-full">
            <div className="rounded-md shadow-sm absolute top-1 flex gap-x-2">
                <input
                    type="text"
                    className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 bor ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="ស្វែងរក..."
                />
                {
                    loading_category ? <div>Loading....</div> :
                        category?.Category.map((item) => {
                            return (
                                <button key={item.category_id} className="py-1.5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    {item.category_name}
                                </button>
                            )
                        })
                }
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-4">
                {/* Product grid */}
                <div className="lg:col-span-3  rounded-md">
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
                <div className="hidden lg:block bg-white rounded-md p-3">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            {cartItems.map((product) => (
                                <li key={product.id} className="flex pb-2">
                                    <div className="flex flex-1 flex-col">

                                        <div className="flex flex-1 items-end justify-between">
                                            <h2 className="font-bold text-gray-900">{product.name}
                                            </h2>
                                            <h2 className="font-bold text-gray-900">{formatCurrency(product.price)}</h2>
                                        </div>


                                        <div className="flex flex-1 items-end justify-between text-sm mt-1">
                                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                <div className="mx-auto flex h-5 items-stretch text-gray-600">
                                                    <button className="flex items-center justify-center rounded-l bg-gray-200 px-2 transition hover:bg-black hover:text-white" onClick={() => decreaseCartQuantity(product.id)}>-</button>
                                                    <div className="flex w-full items-center justify-center bg-gray-100 px-3 text-xs uppercase transition">{product.quantity}</div>
                                                    <button className="flex items-center justify-center rounded-r bg-gray-200 px-2 transition hover:bg-black hover:text-white" onClick={() => increaseCartQuantity(product.id)}>+</button>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => removeFromCart(product.id)}
                                                >
                                                    <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-600" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-red-600 hover:font-bold"
                                            onClick={() => { setProductID(product.id); setOpen(true) }}
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
                            <p className="text-gray-700">{formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    const item = data?.Product.find(i => i.product_id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )}</p>
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
                    ref={componentRef}
                    invoice_id={1}
                    payment_date={new Date()}
                    cashier={"Admin"}
                    cartItems={cartItems}
                    discount={discount}
                    totalAmount={totalAmount()}
                />
            </div>
        </div>
    )
}
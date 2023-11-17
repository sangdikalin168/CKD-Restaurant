import { ArrowUpTrayIcon, CameraIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const CreateMember = ({ setShow, onSubmit }: any) => {


    const [customer_name, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("ប្រុស");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Create the data object with the necessary information
        const data = {
            customer_name: customer_name,
            phone: phone,
            gender: gender
        };
        // Pass the data to the parent component's onSubmit function
        onSubmit(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="border-2 p-2 mb-2 rounded-md bg-white">
                <div>
                    <div>
                        <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    ឈ្មោះអតិថិជន
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    លេខទូរស័ព្ទ
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    ភេទ
                                </label>
                                <div className="mt-2">
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option defaultValue={"ប្រុស"} value="ប្រុស">ប្រុស</option>
                                        <option value="ស្រី">ស្រី</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <div className="flex mt-2 items-center gap-x-3">
                                    <UserCircleIcon className="h-32 w-32 text-gray-300" aria-hidden="true" />
                                    <button
                                        type="button"
                                        className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >   <ArrowUpTrayIcon className="h-5 w-5" />
                                        បញ្ចូលរូប
                                    </button>
                                    <button
                                        type="button"
                                        className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <CameraIcon className="h-5 w-5" />
                                        ថតរូប
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => setShow(false)} className="text-sm font-semibold leading-6 text-gray-900">
                        បោះបង់
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        រក្សារទុក
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateMember
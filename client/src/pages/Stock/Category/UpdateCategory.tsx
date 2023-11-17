import { useState } from "react";
import Notifications from "../../../components/Notification";
import { useUpdateCategoryMutation } from "../../../generated/graphql";

const UpdateCategory = ({ setShow, refetch, selectedItem }: any) => {
    const [form_data, setFormData] = useState({
        category_id: selectedItem.category_id,
        category_name: selectedItem.category_name
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await updateCategory({
            variables: {
                categoryId: form_data.category_id,
                categoryName: form_data.category_name
            }
        })

        if (res.data?.UpdateCategory.success) {
            Notifications("OK", "success");
            setShow(false);
            refetch();
        }
        Notifications(res.data?.UpdateCategory.message, "error");

    }

    const [updateCategory] = useUpdateCategoryMutation();

    return (
        <>
            <form onSubmit={handleSubmit} className="border-2 p-2 mb-2 rounded-md bg-white">
                <div>
                    <div>
                        <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    ប្រភេទទំនិញ
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={form_data.category_name}
                                        autoComplete="off"
                                        type="text"
                                        name="category_name"
                                        required
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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

export default UpdateCategory
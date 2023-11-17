import { useState } from "react";
import Notifications from "../../../components/Notification";
import { ArrowUpTrayIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Compressor from 'compressorjs';
import { useCategoryQuery, useSubCategoryQuery, useUpdateProductMutation, useUpdateProductWithImageMutation } from "../../../generated/graphql";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const UpdateProduct = ({ setShow, refetch, selectedItem }: any) => {
    const [file, setFile] = useState(`http://localhost:4000/images/products/${selectedItem.product_id}.jpg`);

    const [form_data, setFormData] = useState({
        product_name: selectedItem.product_name,
        category_id: selectedItem.category_id,
        subcategory_id: selectedItem.subcategory_id,
        picture: null,
        item_type: selectedItem.item_type,
        vip_price: selectedItem.vip_price,
        price: selectedItem.price,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (form_data.picture === null) {
            const res = await updateProduct({
                variables: {
                    productId: selectedItem.product_id,
                    itemType: form_data.item_type,
                    subcategoryId: Number(form_data.subcategory_id),
                    categoryId: Number(form_data.category_id),
                    vipPrice: Number(form_data.vip_price),
                    price: Number(form_data.price),
                    productName: form_data.product_name
                }
            })
            if (res.data?.UpdateProduct.success) {
                Notifications(res.data.UpdateProduct.message, "success");
                setShow(false);
                refetch();
            }
            refetch();
            Notifications(res.data?.UpdateProduct.message, "error");
        }

        const res = await updateProductWithImage({
            variables: {
                productId: selectedItem.product_id,
                picture: form_data.picture,
                itemType: form_data.item_type,
                subcategoryId: Number(form_data.subcategory_id),
                categoryId: Number(form_data.category_id),
                vipPrice: Number(form_data.vip_price),
                price: Number(form_data.price),
                productName: form_data.product_name
            }
        });

        if (res.data?.UpdateProductWithImage.success) {
            Notifications(res.data.UpdateProductWithImage.message, "success");
            setShow(false);
            refetch();
        }
        refetch();
        Notifications(res.data?.UpdateProductWithImage.message, "error");
    }
    const { data: category, loading: category_loading } = useCategoryQuery({ fetchPolicy: "no-cache" })
    const { data: sub_category, loading: sub_category_loading } = useSubCategoryQuery({ fetchPolicy: "no-cache" })

    const [updateProduct, { loading }] = useUpdateProductMutation();
    const [updateProductWithImage] = useUpdateProductWithImageMutation();

    if (loading || category_loading || sub_category_loading) return <LoadingPage />;

    return (
        <>
            <form id="create_product_form" onSubmit={handleSubmit} className="border-2 p-2 mb-2 rounded-md bg-white">
                <div>
                    <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                        {/* Product Name */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                ឈ្មោះទំនិញ
                            </label>
                            <div className="mt-2">
                                <input
                                    value={form_data.product_name}
                                    autoComplete="off"
                                    type="text"
                                    name="product_name"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                តម្លៃធម្មតា
                            </label>
                            <div className="mt-2">
                                <input
                                    value={form_data.price}
                                    autoComplete="off"
                                    type='number'
                                    step="0.1"
                                    min='0'
                                    name="price"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                តម្លៃVIP
                            </label>
                            <div className="mt-2">
                                <input
                                    value={form_data.vip_price}
                                    autoComplete="off"
                                    type='number'
                                    step="0.1"
                                    min='0'
                                    name="vip_price"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                ប្រភេទទំនិញ
                            </label>
                            <div className="mt-2">
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form_data.category_id}
                                    name="category_id"
                                    onChange={handleChange}
                                >
                                    {
                                        category?.Category.map((data: any) => (
                                            <option
                                                key={data.category_id}
                                                value={data.category_id}
                                            >
                                                {data.category_name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                ប្រភេទរង
                            </label>
                            <div className="mt-2">
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form_data.subcategory_id}
                                    name="subcategory_id"
                                    onChange={handleChange}
                                >
                                    {
                                        sub_category?.SubCategory.map((data: any) => (
                                            <option
                                                key={data.subcategory_id}
                                                value={data.subcategory_id}
                                            >
                                                {data.subcategory_name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                ចម្អិនឬទេ
                            </label>
                            <div className="mt-2">
                                <select
                                    name="item_type"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form_data.item_type}
                                    onChange={handleChange}
                                >
                                    <option defaultValue={"stock"} value="stock">មិនចម្អិន</option>
                                    <option value="cook">ចម្អិន</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="flex mt-2 items-center gap-x-3">
                                {
                                    file === null ?
                                        <div className="grid place-items-center">
                                            <UserCircleIcon className="h-32 w-32 text-gray-300" aria-hidden="true" />
                                            <p className="text-red-500 font-bold">សូមបញ្ចូលរូបភាព</p>
                                        </div>
                                        :
                                        <img className="h-64 w-64 object-cover" src={file} />
                                }
                                <button
                                    type="button"
                                    className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >   <ArrowUpTrayIcon className="h-5 w-5" />
                                    បញ្ចូលរូប
                                </button>
                            </div>
                        </div>

                        <input
                            accept="image/*"
                            id="file-upload"
                            name="file-upload"
                            className="sr-only"
                            type="file"
                            onChange={({
                                target: {
                                    validity,
                                    files: [file],
                                },
                            }) => {
                                if (validity.valid) {
                                    new Compressor(file, {
                                        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
                                        success: (compressedResult) => {
                                            // compressedResult has the compressed file.
                                            // Use the compressed file to upload the images to your server.        
                                            setFile(URL.createObjectURL(compressedResult))
                                            setFormData((prev) => {
                                                return { ...prev, picture: compressedResult }
                                            })

                                        },
                                    });
                                }
                            }}
                        />
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

export default UpdateProduct
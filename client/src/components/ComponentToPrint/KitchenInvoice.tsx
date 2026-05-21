
import React from "react";

type ItemProps = {
    product_name: string
    quantity: number
}

const datetime_format = (date_time: Date) => {
    const date = new Date(date_time);
    return date.toLocaleDateString("fr-CA") + " " + date.toLocaleTimeString();
};

// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const KitchenInvoice = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="w-[80mm] left-0 top-0 z-10 justify-center content-center overflow-auto border border-black p-1">
            {
                props.queue_number > 0 ?
                    <div className="text-sm font-bold text-black">
                        លេខរងចាំ: {props.queue_number}
                    </div>
                    :
                    <div className="text-sm font-bold text-black">
                        លេខកញ្ចុះ: {props.table_number}
                    </div>
            }
            <div className="flex text-xs">
                <p className="text-xs font-semibold text-black mr-2">ការបរិច្ចេទ: {datetime_format(props.payment_date)}</p>
            </div>
            <div>
                <table className="w-full text-xs font-semibold text-black">
                    <thead className="bg-black">
                        <tr className="text-white">
                            <th className="py-0.5 w-1/12 text-center">#</th>
                            <th className="py-0.5 text-left">ទំនិញ</th>
                            <th className="py-0.5 w-1/12 text-center">ចំនួន</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.cartItems.map((item: ItemProps, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-left">{item.product_name}</td>
                                        <td className="text-center">{item.quantity}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
});
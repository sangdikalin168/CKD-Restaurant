
import React from "react";
import { formatCurrency } from "../../utilities/formatCurrency";

type ItemProps = {
    product_name: string
    quantity: number
    unit_price: number
}

const datetime_format = (date_time: Date) => {
    const date = new Date(date_time);
    return date.toLocaleDateString("fr-CA") + " " + date.toLocaleTimeString();
};

// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const OrderInvoice = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="w-[80mm] left-0 top-0 z-10 justify-center content-center overflow-auto border border-black p-1">
            <div className="text-center pt-1">
                <p className="text-xs font-semibold text-black">អាហារដ្ឋាន មិង ហួរ</p>
                <p className="text-xs font-semibold text-black">Order Receipt</p>
            </div>

            {
                <div className="text-sm font-bold text-black">
                    លេខកញ្ចុះ: {props.table_number}
                </div>
            }


            {/* <div className="text-xs font-semibold text-black">
                Order ID: <strong >{props.order_id}</strong>
            </div> */}
            <div className="flex text-xs">
                <p className="text-xs font-semibold text-black mr-2">ការបរិច្ចេទ: {datetime_format(props.payment_date)}</p>
            </div>
            <div className="flex text-xs">
                <p className="text-xs font-semibold text-black" id="print_cashier">បេឡាក: {props.cashier}</p>
            </div>

            <div>
                <table className="w-full text-xs font-semibold text-black">
                    <thead className="bg-black">
                        <tr className="text-white">
                            <th className="py-0.5 w-1/12 text-center">#</th>
                            <th className="py-0.5 text-left">ទំនិញ</th>
                            <th className="py-0.5 w-1/12 text-center">ចំនួន</th>
                            <th className="py-0.5 w-2/12 text-right pr-0.5">តម្លៃ</th>
                            <th className="py-0.5 w-2/12 text-right">សរុប</th>
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
                                        <td className="text-right pr-0.5">{item.unit_price}៛</td>
                                        <td className="text-right">{item.unit_price * item.quantity}៛</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <hr className="my-1 bg-black h-[1px]" />
            <div>
                <div className="flex text-xs text-black font-semibold">
                    <div className="flex-grow">សរុបទឹកប្រាក់</div>
                    <div>
                        {formatCurrency(
                            props.cartItems.reduce((total: number, cartItem) => {
                                const item = props.cartItems.find(
                                    i => i.product_id === cartItem.product_id
                                )
                                return total + (item?.unit_price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </div>
                <hr className="my-1 bg-black h-[1px]" />
            </div>
            <div className="text-center">
                <p className="text-xs font-semibold text-black">សូមអរគុណ!</p>
                <p className="text-xs font-semibold text-black">012 558 789 / 070 239 789</p>
                <p className="text-xs font-semibold text-black">អាសយដ្ឋានលេខៈ 81AE0E1 ផ្លូវ40D សង្កាត់ដង្កោ</p>
                <p className="text-xs font-semibold text-black">ខណ្ឌដង្កោ រាជធានីភ្នំពេញ</p>
            </div>
        </div>
    );
});
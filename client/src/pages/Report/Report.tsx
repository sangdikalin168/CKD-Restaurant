import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { DateTimePicker } from "../../components/DateTimePicker";

type ReportInterface = {
  product_id: number
  product_name: string
  price: number
  vip_price: number
  category_name: string
};

export const Report = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => []);

  function date_time_format(date_time: Date) {
    const date = new Date(date_time);
    return date.toLocaleDateString("fr-CA");
  }

  const [showDateTo, setShowDateTo] = useState(false);
  const [showDateFrom, setShowDateFrom] = useState(false);

  const [selectedDateFrom, setSelectedDateFrom] = useState(
    date_time_format(new Date())
  );

  const handleCloseDateFrom = (state: boolean) => {
    setShowDateFrom(state);
  };
  const handleChangeDateFrom = (selectedDate: Date) => {
    setLoading(true);
    setSelectedDateFrom(date_time_format(selectedDate));
    setLoading(false);
  };

  const [selectedDateTo, setSelectedDateTo] = useState(
    date_time_format(new Date())
  );
  const handleChangeDateTo = (selectedDate: Date) => {
    setLoading(true);
    setSelectedDateTo(date_time_format(selectedDate));
    setLoading(false);
  };
  const handleCloseDateTo = (state: boolean) => {
    setShowDateTo(state);
  };

  // const { data, loading, error, refetch } = useProductQuery({ fetchPolicy: "no-cache" });

  // const columnHelper = createColumnHelper<ReportInterfaces>();
  // const columns = [
  //     columnHelper.accessor((row) => row.product_id, {
  //         id: "No",
  //         cell: (info) => info.getValue(),
  //         header: (info) => <span>{info.column.id}</span>,
  //         footer: (info) => info.column.id,
  //     }),
  //     columnHelper.accessor((row) => row.product_name, {
  //         id: "ឈ្មោះទំនិញ",
  //         cell: (info) => info.getValue(),
  //         header: (info) => <span>{info.column.id}</span>,
  //         footer: (info) => info.column.id,
  //     }),
  //     columnHelper.accessor((row) => row.category_name, {
  //         id: "ចំនួន",
  //         cell: (info) => info.getValue(),
  //         header: (info) => <span>{info.column.id}</span>,
  //         footer: (info) => info.column.id,
  //     }),
  //     columnHelper.accessor((row) => row.price, {
  //         id: "តម្លៃ",
  //         cell: (info) => <>{info.getValue()}៛</>,
  //         header: (info) => <span>{info.column.id}</span>,
  //         footer: (info) => info.column.id,
  //     }),
  //     columnHelper.accessor((row) => row.vip_price, {
  //         id: "សរុប",
  //         cell: (info) => <>{info.getValue()}៛</>,
  //         header: (info) => <span>{info.column.id}</span>,
  //         footer: (info) => info.column.id,
  //     }),
  // ];

  return (
    <>
      {!loading ? (
        <div className="select-none">
          {/* CheckBox */}

          {/* DateTime Picker */}
          <div className="px-2 flex">
            <div className="col-span-1 mr-1">
              <DateTimePicker
                onChange={handleChangeDateFrom}
                value={selectedDateFrom}
                show={showDateFrom}
                setShow={handleCloseDateFrom}
              />
            </div>

            <div className="col-span-1 mr-1">
              <DateTimePicker
                onChange={handleChangeDateTo}
                value={selectedDateTo}
                show={showDateTo}
                setShow={handleCloseDateTo}
              />
            </div>

            <div>
              <button
                type="button"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              // onClick={() => CombineData(0)}
              >
                Search
              </button>
            </div>
          </div>

          <div className="p-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((payment, index) => {
                    return (
                      <tr key={index} className="odd:bg-white even:bg-gray-100 text-left">
                        <td className="px-2 py-2 text-left text-sm">{payment.item}</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.qty}</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.price}$</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.total}$</td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot className="bg-gray-300">
                <tr className="text-md font-bold">
                  <td className="px-1 py-1">សរុប $ {0} </td>
                  <td className="px-1 py-1"></td>
                  <td className="px-1 py-1"></td>
                  <td className="px-1 py-1"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-screen">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      )}
    </>
  )
}

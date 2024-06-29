import { useState } from "react";
import { DateTimePicker } from "../../components/DateTimePicker";
import { gql, useLazyQuery } from "@apollo/client";


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


  const GET_ORDERDETAILS = gql`
    query GetOrderDetails($dateTo: String!, $dateFrom: String!) {
        GetOrderDetails(dateTo: $dateTo, dateFrom: $dateFrom) {
    product_id
    product_name
    qty
    unit_price
    total
  }
}
`;

  const [GetDetails] = useLazyQuery(GET_ORDERDETAILS, { fetchPolicy: "no-cache" });

  const [total, SetTotal] = useState(0);

  const GetDetailMember = async () => {
    const result = await GetDetails({
      variables: {
        dateFrom: selectedDateFrom,
        dateTo: selectedDateTo,
      },
    });

    if (!result.loading) {
      setData(result.data.GetOrderDetails)

      const sum = result.data.GetOrderDetails.reduce((acc: any, object: any) => {
        return acc + object.total;
      }, 0);

      SetTotal(sum);
    }
  };

  function printDiv(divId) {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

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

            <div className="space-x-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                onClick={() => GetDetailMember()}
              >
                Search
              </button>

              <button
                type="button"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                onClick={() => printDiv('printableArea')}
              >
                Print
              </button>
            </div>
          </div>

          <div className="p-2" id="printableArea">
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
                        <td className="px-2 py-2 text-left text-sm">{payment.product_name}</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.qty}</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.unit_price}$</td>
                        <td className="px-2 py-2 text-left text-sm">{payment.total}$</td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot className="bg-gray-300">
                <tr className="text-md font-bold">
                  <td className="px-1 py-1">សរុប $ {total} </td>
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

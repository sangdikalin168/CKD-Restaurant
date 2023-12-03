import { useEffect, useState } from "react";
import { Pos } from "./Pos";
import { useTablesLazyQuery } from "../../generated/graphql";

export function Sell() {
  const [show_pos, setShowPOS] = useState(false);
  const [isTableMode, setIsTableMode] = useState(false);
  const [table_id, setTableID] = useState(0);
  const [table_name, setTableName] = useState("");
  const [status, setTableStatus] = useState("");

  const [getTables, { data }] = useTablesLazyQuery({ fetchPolicy: "no-cache" })

  const RenderContent = () => {
    if (show_pos) {
      return <Pos setShowPOS={setShowPOS} isTableMode={isTableMode} table_name={table_name} table_id={table_id} status={status} />
    }
    return (
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-12 xl:gap-x-3">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <button
            className="text-3xl bg-cyan-600 text-white hover:bg-red-400"
            onClick={() => { setShowPOS(true); setIsTableMode(false) }}
          >
            ខ្ចប់
          </button>
        </div>
        {
          data?.Tables.map((item) => (
            <div key={item.table_id} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
              <button
                className={`text-3xl hover:bg-red-400 ${item.status == "Available" ? "bg-green-500" : "bg-red-500"}`}
                onClick={() => {
                  setIsTableMode(true);
                  setShowPOS(true);
                  setTableID(item.table_id);
                  setTableName(item.table_name);
                  setTableStatus(item.status)
                }}
              >
                {item.table_name}
              </button>
            </div>
          ))
        }
      </div>
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      getTables();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="mx-auto">
        <h2 className="sr-only">Products</h2>
        {
          RenderContent()
        }
      </div>
    </div>
  );
}

const kajos = [
  { table_number: 1, table_name: "T1", status: "Available" }
  , { table_number: 2, table_name: "T2", status: "Available" }
  , { table_number: 3, table_name: "T3", status: "Available" }
  , { table_number: 4, table_name: "T4", status: "Occupied" }
  , { table_number: 5, table_name: "T5", status: "Available" }
  , { table_number: 6, table_name: "VIP1", status: "Available" }
  , { table_number: 7, table_name: "VIP2", status: "Available" }
  , { table_number: 8, table_name: "VIP3", status: "Available" }
]

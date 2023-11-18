import { useState } from "react";
import { Pos } from "./Pos";

export function Sell() {
  const [show_pos, setShowPOS] = useState(false);
  const [isTableMode, setIsTableMode] = useState(false);

  const RenderContent = () => {
    if (show_pos) {
      return <Pos setShowPOS={setShowPOS} isTableMode={isTableMode} />
    }
    return (
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 xl:gap-x-3">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <button
            className="text-4xl bg-cyan-600 text-white hover:bg-red-400"
            onClick={() => { setShowPOS(true); setIsTableMode(false) }}
          >
            ខ្ចប់
          </button>
        </div>
        {kajos.map((item) => (
          <div key={item.table_number} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
            <button
              className="text-4xl bg-green-500 hover:bg-red-400"
              onClick={() => { setIsTableMode(true); setShowPOS(true); }}
            >
              {item.table_name}
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto px-2 py-2 sm:px-2 sm:py-4 lg:px-4">
        <h2 className="sr-only">Products</h2>
        {
          RenderContent()
        }
      </div>
    </div>
  );
}

const kajos = [
  { table_number: 1, table_name: "T1" }
  , { table_number: 2, table_name: "T2" }
  , { table_number: 3, table_name: "T3" }
  , { table_number: 4, table_name: "T4" }
  , { table_number: 5, table_name: "T5" }
  , { table_number: 6, table_name: "VIP1" }
  , { table_number: 7, table_name: "VIP2" }
  , { table_number: 8, table_name: "VIP3" }
]


import React, { Fragment, useEffect, useState } from "react";
import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { RowData } from '@tanstack/react-table';
import { rankItem } from "@tanstack/match-sorter-utils";

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";


interface IChildProps {
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  data: RowData[];
  //columns: ColumnDef<RowData>[];
  columns: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

type AvatarCellProps = {
  display_name: string;
  username: string;
  imageUrl: string;
};

export function AvatarCell({
  display_name,
  username,
  imageUrl,
}: AvatarCellProps) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{display_name}</div>
        <div className="text-sm text-gray-500">{username}</div>
      </div>
    </div>
  );
}

export default function DataTable({ columns, data, button }: IChildProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });


  useEffect(() => {
    table.setPageSize(Number(20))
  }, [table]);

  return (
    <div>
      <div>
        <div className="sm:flex sm:gap-x-2">
          {button}

          {/* Search Box*/}
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search"
          />

          {/* Visibility Button Group*/}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Visibility
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {table.getAllLeafColumns().map((column) => {
                    return (
                      <div key={column.id} className="px-1">

                        <Menu.Item>
                          {() => (
                            <>
                              <input
                                {...{
                                  type: "checkbox",
                                  checked: column.getIsVisible(),
                                  onChange: column.getToggleVisibilityHandler(),
                                  className:
                                    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                }}
                              />
                              {" "}
                              {column.id}
                            </>
                          )}
                        </Menu.Item>
                      </div>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Add Button*/}
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500"
          >
            Excel
          </button>

          {/* Add Button*/}
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500"
          >
            PDF
          </button>

          {/* Add Button*/}
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500"
          >
            Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-t-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="divide-x divide-gray-200 dark:divide-gray-300">
                      {headerGroup.headers.map(header => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          key={header.id}
                          scope="col"
                          className="group px-2 py-3 text-left text-xs font-medium text-black tracking-wider"
                        >
                          <div className="flex items-center justify-between">
                            {/* Add a sort direction indicator */}
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-300 w-32 text-sm">
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id} className="divide-x divide-gray-200 dark:divide-gray-300">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id} className="px-2 py-1 whitespace">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>




      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6 rounded-b-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> of{" "}
                <span className="font-medium">{table.getPageCount()}</span>{" "}
                results
              </p>
            </div>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize} className='bg-red-100 text-gray-700 block px-4 py-2 text-sm'>
                    {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronDoubleLeftIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </button>

                <button
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronDoubleRightIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <label className="flex gap-x-2 items-baseline">
      <div>
        <div className="relative rounded-md shadow-sm">
          <input
            {...props}
            value={value}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 bor ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search..."
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </label>
  );
}


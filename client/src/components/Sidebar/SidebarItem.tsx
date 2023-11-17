/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "@tanstack/react-router";

export default function SidebarItem({ item }: any) {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div>
        <li
          className="flex gap-x-2 p-2 cursor-pointer hover:bg-blue-600 hover:text-white text-black text-sm items-center`"
          onClick={() => setOpen(!open)}
        >
          {item.icon ? item.icon : <MdOutlineDashboard />}
          <span className="flex-1 font-semibold ">{item.title}</span>
          {item.childrens && (
            <BsChevronDown className={`${open && "rotate-180"} mr-2`} />
          )}
        </li>
        {open ? (
          <div className="px-5">
            {item.childrens.map((child: any, index: number) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <Link
        className="flex gap-x-2 cursor-pointer text-sm hover:bg-blue-600 hover:text-white text-black p-2 items-center"
        to={item.path}
        //onClick={() => (window.location.href = item.path)}
      >
        {item.icon ? item.icon : <MdOutlineDashboard />}
        <span className="flex-1 font-semibold">{item.title}</span>
      </Link>
    );
  }
}

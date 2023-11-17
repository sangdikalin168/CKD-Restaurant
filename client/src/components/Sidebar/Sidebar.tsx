/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { BiMenuAltLeft } from "react-icons/bi";
import { HiOutlineUserCircle, HiOutlineTicket } from "react-icons/hi";
import { FaUserCog } from "react-icons/fa";

interface Props {
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: boolean;
}

const items = [
  {
    title: "លក់",
    path: "/sell",
    icon: <HiOutlineTicket className="text-2xl" />,
  },
  // {
  //   title: "Product",
  //   icon: <HiOutlineUserCircle className="text-2xl" />,
  //   childrens: [
  //     {
  //       title: "Product List",
  //       path: "/product",
  //       icon: <HiOutlineUserCircle className="text-2xl" />,
  //     },
  //     {
  //       title: "Service",
  //       path: "/other_product",
  //       icon: <HiOutlineUserCircle className="text-2xl" />,
  //     },
  //     {
  //       title: "Category",
  //       path: "/category",
  //       icon: <FaUserCog className="text-2xl" />,
  //     },
  //     {
  //       title: "Brand",
  //       path: "/brand",
  //       icon: <FaUserCog className="text-2xl" />,
  //     },
  //     {
  //       title: "Specification",
  //       path: "/specification",
  //       icon: <FaUserCog className="text-2xl" />,
  //     },
  //   ],
  // },
  // {
  //   title: "Stock",
  //   icon: <HiOutlineUserCircle className="text-2xl" />,
  //   childrens: [
  //     {
  //       title: "Stock",
  //       path: "/stock",
  //       icon: <FaUserCog className="text-2xl" />,
  //     },
  //     {
  //       title: "Stock Count",
  //       path: "/stock_count",
  //       icon: <HiOutlineUserCircle className="text-2xl" />,
  //     },
  //   ],
  // },
  {
    title: "Report",
    icon: <HiOutlineUserCircle className="text-2xl" />,
    childrens: [
      {
        title: "ចំណូល",
        path: "/income",
        icon: <HiOutlineUserCircle className="text-2xl" />,
      },
      {
        title: "អតិថិជន",
        path: "/expense",
        icon: <FaUserCog className="text-2xl" />,
      },
    ],
  },
  {
    title: "អ្នកប្រើប្រាស់",
    icon: <HiOutlineUserCircle className="text-2xl" />,
    childrens: [
      {
        title: "អ្នកប្រើប្រាស់",
        path: "/user",
        icon: <HiOutlineUserCircle className="text-2xl" />,
      },
      {
        title: "កំណត់សិទ្ធិ",
        path: "/user_authorize",
        icon: <FaUserCog className="text-2xl" />,
      },
    ],
  },
];

export default function Sidebar({ toggleSidebar, setToggleSidebar }: Props) {
  const [company_name, setCompanyName] = useState("Ming Hour");

  useEffect(() => {
    setCompanyName("Ming Hour")
  }, [])

  return (
    <div
    // className={`${!toggleSidebar && "-translate-x-[15rem]"
    //   } w-full z-50 h-screen bg-white left-0 top-0 fixed transition ease-in-out duration-500`}
    >
      <div className="h-[3rem] flex justify-between items-center px-4">
        <h1 className="text-gray-500 font-bold">{company_name}</h1>
        <BiMenuAltLeft
          className="text-xl text-black cursor-pointer lg:hidden"
          onClick={() => setToggleSidebar(false)}
        />
      </div>
      <hr />
      <div className="h-full">
        {items.map((item: any, index: number) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

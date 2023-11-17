/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import JWTManager from "../../utils/jwt";
import { useAuthContext } from "../../context/AuthContext";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface Props {
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setToggleSidebar }: Props) => {

    const { setIsAuthenticated } = useAuthContext();
    const userNavigation = [
        { name: "Your Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#", onclick: () => { JWTManager.deleteToken(); setIsAuthenticated(false) } },
    ];
    const [darkMode, setDarkMode] = useState(true);

    const display_name = localStorage.getItem("display_name")

    return (
        <div
            className={`h-[3rem] top-0 w-full flex justify-between items-center bg-white px-2 lg:px-4 dark:bg-black ${darkMode ? "dark" : ""
                }`}
        >
            <div className="flex items-center">
                <BiMenuAltRight
                    className="text-xl lg:text-2xl cursor-pointer text-gray-500"
                    onClick={() => setToggleSidebar(true)}
                />
            </div>
            <div className="flex  items-center">
                <div className="mr-2 text-center invisible sm:visible lg:visible">
                    <p className="text-white">{display_name}</p>
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                            />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                            onClick={item.onclick}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;

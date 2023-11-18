import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'
import { useState } from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'


const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col h-screen">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-200 text-lg">មីង ហួរ</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    if (link.childrens) {
        return (
            <div>
                <li
                    className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
                    onClick={() => setOpen(!open)}
                >
                    {link.icon ? link.icon : <MdOutlineDashboard />}
                    <span className="flex-1">{link.label}</span>
                    {link.childrens && (
                        <BsChevronDown className={`${open && "rotate-180"} mr-2`} />
                    )}
                </li>
                {open ? (
                    <div className="px-5">
                        {link.childrens.map((child: any, index: number) => (
                            <Link
                                key={index}
                                to={child.path}
                                className={classNames(pathname === child.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
                            >
                                <span className="text-xl">{child.icon}</span>
                                {child.label}
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    } else {
        return (
            <Link
                to={link.path}
                className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
            </Link>
        )
    }
}
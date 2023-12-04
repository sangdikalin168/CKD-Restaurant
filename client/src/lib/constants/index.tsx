import { BiCategory } from 'react-icons/bi'
import { FaProductHunt } from 'react-icons/fa'
import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'pos',
        label: 'លក់',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'products',
        label: 'ទំនិញ & ស្តុក',
        icon: <HiOutlineCube />,
        childrens: [
            {
                label: "ទំនិញ",
                path: "/product",
                icon: <FaProductHunt className="text-2xl" />,
            },
            {
                label: "ប្រភេទ",
                path: "/category",
                icon: <BiCategory className="text-2xl" />,
            },
            {
                label: "ប្រភេទរង",
                path: "/sub_category",
                icon: <BiCategory className="text-2xl" />,
            },
        ],

    },
    {
        key: 'reports',
        label: 'Reports',
        path: '/reports',
        icon: <HiOutlineShoppingCart />
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
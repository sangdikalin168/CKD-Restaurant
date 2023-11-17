import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <div id="sidebar" className='h-screen'>
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto scrollbar-hide">
                    <Outlet />
                </div>
            </div>
            <ToastContainer pauseOnFocusLoss={false} />
        </div>
    )
}
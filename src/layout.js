import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
    return (
        <div className="absolute 2xl left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 h-3/4">

            <nav className="bg-neutral-900 text-neutral-300 border-neutral-700 border-2 rounded-3xl p-1 flex gap-2 justify-center my-6">
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/">Clock</Link>
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/timer' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/timer">Timer</Link>
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/stopwatch' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/stopwatch">Stopwatch</Link>
            </nav>
            
            <div className="bg-neutral-900 text-neutral-300 border-neutral-700 border-2 rounded-3xl px-8 py-24 text-center">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;

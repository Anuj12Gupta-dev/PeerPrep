import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkBaseClasses = "px-3 sm:px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-x-2.5 text-sm font-medium";
  const navLinkInactiveClasses = "text-slate-400 hover:text-white hover:bg-white/5";
  const navLinkActiveClasses = "bg-blue-600 text-white shadow-lg shadow-blue-900/40";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="size-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <SparklesIcon className="size-5 text-white" />
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight">
              PeerPrep
            </span>
            <span className="text-xs text-slate-500 font-medium -mt-1 hidden lg:inline">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          
          <Link
            to={"/problems"}
            className={`${navLinkBaseClasses} ${
              isActive("/problems")
                ? navLinkActiveClasses
                : navLinkInactiveClasses
            }`}
          >
            <BookOpenIcon className="size-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <Link
            to={"/dashboard"}
            className={`${navLinkBaseClasses} ${
              isActive("/dashboard")
                ? navLinkActiveClasses
                : navLinkInactiveClasses
            }`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
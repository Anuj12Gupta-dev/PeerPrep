import { Link, useLocation, useNavigate } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/dashboard"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg ">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              Talent IQ
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive("/dashboard")
                ? "bg-primary/10 text-primary font-medium"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200"
            }`}
          >
            <LayoutDashboardIcon className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/problems"
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive("/problems")
                ? "bg-primary/10 text-primary font-medium"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200"
            }`}
          >
            <BookOpenIcon className="w-5 h-5" />
            Problems
          </Link>
        </div>

        {/* USER PROFILE */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{user?.name || "User"}</span>
              <span className="text-xs text-base-content/60">{user?.email || ""}</span>
            </div>
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-base-200 transition-colors text-base-content/70 hover:text-error"
          >
            <LogOutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
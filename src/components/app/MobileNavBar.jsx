import { User, Bell, Home, Hash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Hash, label: "Topics", path: "/topics" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            currentPath === path ||
            (path !== "/" && currentPath.startsWith(path));
          return (
            <Link
              key={label}
              to={path}
              className="relative flex flex-col items-center gap-1 w-full py-1"
            >
              <Icon
                size={20}
                className={`${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavBar;

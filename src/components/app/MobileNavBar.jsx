import {
  User,
  Bell,
  Home,
  Hash,
} from "lucide-react";

const MobileNavBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 lg:hidden z-50">
    <div className="flex justify-around items-center h-16">
      <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
        <Home size={20} />
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
        <Hash size={20} />
        <span className="text-xs">Topics</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
        <Bell size={20} />
        <span className="text-xs">Alerts</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
        <User size={20} />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  </div>
);

export default MobileNavBar;
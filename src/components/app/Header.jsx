import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncSetDarkTheme } from "@/states/appTheme/action";
import { useNavigate } from "react-router";
import { home, login } from "@/routes/routeName";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { asyncLogoutUser } from "@/states/authUser/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMatch } from "react-router";
import { SearchInput } from "./SearchInput";

const Header = () => {
  const isVisibleSearchBar = useMatch(home);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const authUser = useSelector((state) => state.authUser);
  const appTheme = useSelector((state) => state.appTheme);
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(asyncLogoutUser());
    } finally {
      setIsLoggingOut(false);
    }
  };
  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(asyncSetDarkTheme(appTheme))}
      className="rounded-full"
      aria-label={`Switch to ${appTheme === "dark" ? "light" : "dark"} mode`}
    >
      {appTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );

  const UserMenu = () => (
    <AlertDialog>
      <Menubar className="bg-transparent border-none shadow-none">
        <MenubarMenu className="bg-blue-700">
          <MenubarTrigger className="rounded-full">
            <img
              src={authUser.authUser.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full ring-2 ring-purple-500 cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent>
            <AlertDialogTrigger asChild>
              <MenubarItem className="flex items-center gap-2 cursor-pointer">
                <LogOut size={15} />
                <span>Logout</span>
              </MenubarItem>
            </AlertDialogTrigger>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You&apos;ll need to sign in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="gap-2"
          >
            {isLoggingOut && <Loader2 size={16} className="animate-spin" />}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b dark:border-gray-700 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 lg:hidden">
          <span className="font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Dicoding Forum
          </span>
        </div>

        <div className={`flex-1 max-w-xl mx-4 ${isVisibleSearchBar ? '' : 'hidden'} `}>
          <SearchInput className="hidden md:block" />
        </div>

        <div className={`flex items-center gap-4 ${!isVisibleSearchBar ? 'w-full justify-end' : ''}`}>
          <ThemeToggle />

          {authUser.authUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{authUser.authUser.name}</span>
              <UserMenu />
            </div>
          ) : (
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              onClick={() => navigate(login)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <div className={`p-4 md:hidden ${isVisibleSearchBar ? '' : 'hidden'}`}>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;

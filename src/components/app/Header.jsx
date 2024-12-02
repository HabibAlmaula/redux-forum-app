import { Button } from "@/components/ui/button";
import { Moon, Sun, Search, Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/states/appTheme/action";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { authUser, appTheme } = useSelector((state) => state);
  
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 left-0 right-0 lg:left-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b dark:border-gray-700 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="px-4 py-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Dicoding Forum
                  </span>
                </div>
                <div className="space-y-4">
                  {["Home", "Trending", "Leaderboard", "Notifications"].map(
                    (item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        {item}
                      </Button>
                    )
                  )}
                  <div className="border-t dark:border-gray-700 my-4"></div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-3">
                    Categories
                  </h3>
                  {["Tech", "Design", "Development", "Career"].map(
                    (category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start text-sm font-normal"
                      >
                        # {category}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-bold text-lg">DevForum headers</span>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search discussions..."
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setDarkMode(appTheme))}
            className="rounded-full"
          >
            {appTheme == "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {authUser !== null ? (
            <div className="flex items-center gap-2">
              <Bell
                size={20}
                className="text-gray-500 cursor-pointer hidden sm:block"
              />
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-purple-500"
                />
              </div>
            </div>
          ) : (
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              // onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 md:hidden">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 dark:bg-gray-700 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;

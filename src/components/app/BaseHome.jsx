import MobileNavBar from "./MobileNavBar";
import Sidebar from "./SideBar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const BaseHome = ({ children }) => {
    const authUser = useSelector((state) => state.authUser);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <Header />
            <main className="lg:ml-64 pt-32 md:pt-20 pb-20 lg:pb-6 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </main>

            <MobileNavBar />
        </div>
    );
};
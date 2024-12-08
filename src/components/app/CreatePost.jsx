import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export const CreatePost = () => {
    const authUser = useSelector((state) => state.authUser);
    return (
        <Card className="mb-6 mt-5 md:mt-0">
            <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                    <img
                        src={authUser.authUser.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <Input
                            placeholder="Start a discussion"
                            className="mb-3 bg-gray-50 dark:bg-gray-700"
                        />
                        <div className="flex flex-wrap gap-2 sm:justify-between sm:items-center">
                            <div className="flex gap-2 order-2 sm:order-1">
                                {["General", "Tech", "Design"].map((tag) => (
                                    <Button
                                        key={tag}
                                        variant="outline"
                                        size="sm"
                                        className="text-sm"
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                            <Button className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-2 sm:mb-0">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
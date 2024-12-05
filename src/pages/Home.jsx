import MobileNavBar from "../components/app/MobileNavBar";
import Sidebar from "../components/app/SideBar";
import Header from "../components/app/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { asyncPopulateUsersAndThreads } from "@/states/shared/action";
import ThreadList from "@/components/app/ThreadList";
import { LoadingThreadList } from "@/components/app/LoadingThread";
import { requestState as loadingState } from "@/utils/requestState";
import { toast } from "react-toastify";

export const Home = () => {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleUpVote = (threadId) => {
    console.log(threadId);
  };

  const handleDownVote = (threadId) => {
    console.log(threadId);
  };

  const testToast = () => {
    toast.success("Test toast");
  }


  const threadList = threads.threads.map((thread) => ({
    ...thread,
    user: users.users.find((user) => user.id === thread.ownerId),
    authUser: authUser.authUser.id,
  }));

  const renderThreadList = () => {
    const state = `${threads.requestState}_${users.requestState}`;

    switch (state) {
      case `${loadingState.loading}_${loadingState.loading}`:
      case `${loadingState.loading}_${loadingState.success}`:
      case `${loadingState.success}_${loadingState.loading}`:
        return <LoadingThreadList />;

      case `${loadingState.failure}_${loadingState.failure}`:
      case `${loadingState.failure}_${loadingState.success}`:
      case `${loadingState.success}_${loadingState.failure}`:
        return <div>Error loading content</div>;

      case `${loadingState.success}_${loadingState.success}`:
        return (
          <ThreadList
            threads={threadList}
            upVote={handleUpVote}
            downVote={handleDownVote}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 pt-32 md:pt-20 pb-20 lg:pb-6 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {authUser != null && (
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
          )}
          <div className="space-y-4">
            {renderThreadList()}
          </div>
        </div>
      </main>

      <MobileNavBar />
    </div>
  );
};

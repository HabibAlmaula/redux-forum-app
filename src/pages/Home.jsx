import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "@/states/shared/action";
import ThreadList from "@/components/app/ThreadList";
import { LoadingThreadList } from "@/components/app/LoadingThread";
import {
  requestState as loadingState,
  requestState,
} from "@/utils/requestState";
import { BaseHome } from "@/components/app/BaseHome";
import { CreatePostInput } from "@/components/app/CreatePost";
import {
  asyncPostThread,
  asyncVoteThreads,
  filterCategoryThread,
} from "@/states/threads/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Home = () => {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const voteLoadingState = useSelector(
    (state) => state.threads.voteLoadingState || loadingState.initial
  );
  const postLoadingState = useSelector(
    (state) => state.threads.postLoadingState || loadingState.initial
  );

  const dispatch = useDispatch();

  const handleVote = (threadId, voteType, userId) => {
    dispatch(asyncVoteThreads(threadId, voteType, userId));
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handlePostThread = (title, body, category) => {
    dispatch(asyncPostThread(title, body, category));
  };

  const handleCategoryChange = (value) => {
    // If "all" is selected, we'll pass null to reset the filter
    const categoryToFilter = value === "all" ? "" : value;
    dispatch(filterCategoryThread(categoryToFilter));
  };

  const threadsToMap =
    threads.filteredThreads.length > 0 || threads.query.trim() !== ""
      ? threads.filteredThreads
      : threads.threads;

  const threadList = threadsToMap.map((thread) => ({
    ...thread,
    user: users.users.find((user) => user.id === thread.ownerId),
    authUser: authUser.authUser.id,
    onVote: handleVote,
    voteLoadingState,
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
        const categories = threads.threads.reduce((acc, thread) => {
          if (!acc.includes(thread.category)) {
            acc.push(thread.category);
          }
          return acc;
        }, []);
        return (
          <>
            <div className="flex items-center gap-5">
              <p>Select Category</p>
              <Select onValueChange={handleCategoryChange} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {threadList.length > 0 ? (
              <ThreadList threads={threadList} />
            ) : (
              <div className="flex justify-center items-center min-h-[100px]">
                <p className="text-gray-500">No threads found</p>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <BaseHome>
      {authUser != null && (
        <CreatePostInput
          authUser={authUser}
          isLoading={postLoadingState == requestState.loading}
          handlePostSubmit={handlePostThread}
        />
      )}
      <div className="space-y-4">{renderThreadList()}</div>
    </BaseHome>
  );
};

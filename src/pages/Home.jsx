import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "@/states/shared/action";
import ThreadList from "@/components/app/ThreadList";
import { LoadingThreadList } from "@/components/app/LoadingThread";
import { requestState as loadingState } from "@/utils/requestState";
import { BaseHome } from "@/components/app/BaseHome";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatePost } from "@/components/app/CreatePost";
import { asyncVoteThread } from "@/states/thread/action";
import { asyncVoteThreads } from "@/states/threads/action";

export const Home = () => {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const voteLoadingState = useSelector((state) => state.threads.voteLoadingState || loadingState.initial);

  const dispatch = useDispatch();


  const handleVote = (threadId, voteType, userId) => {
    dispatch(asyncVoteThreads(threadId, voteType, userId));
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);



  const threadList = threads.threads.map((thread) => ({
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
        return (
          <ThreadList
            threads={threadList}
          />
        );

      default:
        return null;
    }
  }

  return (
    <BaseHome>
      {authUser != null && (
        <CreatePost />
      )}
      <div className="space-y-4">
        {renderThreadList()}
      </div>
    </BaseHome>
  );
};

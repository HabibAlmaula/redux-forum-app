import { BaseHome } from "@/components/app/BaseHome";
import { ThreadCard } from "@/components/app/ThreadCard";
import { asyncFetchThreadDetail, asyncVoteThread } from "@/states/thread/action";
import { requestState } from "@/utils/requestState";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThreadComments } from "@/components/app/ThreadComments";
import CommentInput from "@/components/app/CommentInput";
import { asyncPostComment } from "@/states/comments/action";
import { LoadingThreadList } from "@/components/app/LoadingThread";

export const DetailTrhead = () => {
  const { id } = useParams();
  const thread = useSelector((state) => state.thread);
  const authUser = useSelector((state) => state.authUser);
  const voteLoadingState = useSelector((state) => state.thread.voteRequestState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(id));
  }, [dispatch, id]);

  const handleVote = (threadId, voteType, userId) => {
    dispatch(asyncVoteThread(threadId, voteType, userId));
  };

  const handleCommentSubmit = (content) => {
    dispatch(asyncPostComment(id, content));
  };

  const renderThreadDetail = () => {
    switch (thread.requestState) {
      case requestState.loading:
        return <LoadingThreadList />;
      case requestState.success: {
        const threadDetail = {
          ...thread.thread,
          user: thread.thread.owner,
          authUser: authUser.authUser.id,
        };
        return (
          <div className="flex flex-col">
            <ThreadCard
              key={id}
              {...threadDetail}
              showFullBody={true}
              totalComments={threadDetail.comments.length}
              onVote={handleVote}
              voteLoadingState={voteLoadingState}
            />
            <CommentInput onSubmit={handleCommentSubmit} />
            <ThreadComments comments={threadDetail.comments} />
          </div>
        );
      }
      case requestState.failure:
        return <div>Error loading content</div>;
      default:
        return null;
    }
  };

  return <BaseHome>{renderThreadDetail()}</BaseHome>;
};

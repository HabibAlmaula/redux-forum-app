
import PropTypes from 'prop-types';
import { CommentItem, commentItemShape } from './CommentItem';
import { Card, CardContent } from '../ui/card';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { asyncVoteComment } from '@/states/thread/action';
export const ThreadComments = ({ comments }) => {
  const authUser = useSelector((state) => state.authUser.authUser.id);
  const threadId = useSelector((state) => state.thread.thread.id);
  const dispatch = useDispatch();

  const onVote = (threadId, commentId, voteType, authUser) => {
    dispatch(asyncVoteComment(threadId, commentId, voteType, authUser));
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-5 mt-5">Comments({comments.length})</p>
      {comments.length === 0 ? (
        <div className="flex justify-center items-center min-h-[100px]">
          <p className="text-gray-500">No comments yet</p>
        </div>
      ) : (
        <Card>
          <CardContent>
            {comments.map((comment) => (
              <CommentItem
                {...comment}
                key={comment.id}
                threadId={threadId}
                avatar={comment.owner.avatar}
                name={comment.owner.name}
                authUser={authUser}
                onVote={onVote}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

ThreadComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired
};
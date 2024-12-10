import moment from 'moment';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import VoteButton from './VoteButton';
import { requestState } from '@/utils/requestState';
export const CommentItem = ({ threadId, id, avatar, name, createdAt, content, upVotesBy = [], downVotesBy = [], authUser, voteLoadingState, onVote, }) => {

    const isCommentLiked = upVotesBy.includes(authUser);
    const isCommentDisliked = downVotesBy.includes(authUser);

    const handleVote = (e, voteType) => {
        e.stopPropagation();
        if (voteLoadingState === requestState.loading) {
            return;
        }

        if (voteType === "up" && isCommentLiked) {
            onVote(threadId, id, "neutral", authUser);
        } else if (voteType === "down" && isCommentDisliked) {
            onVote(threadId, id, "neutral", authUser);
        } else {
            onVote(threadId, id, voteType, authUser);
        }
    };

    return (
        <div key={id} className="flex flex-col p-4">
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={avatar}
                    alt={name}
                    className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {name}
                </span>
                <span className="text-sm text-gray-400 hidden sm:inline">•</span>
                <span className="text-sm text-gray-400 hidden sm:inline">
                    {moment(createdAt).fromNow()}
                </span>
            </div>
            <div
                className="text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content),
                }}
            />
            <hr className="my-4" />
            <VoteButton
                upVotesBy={upVotesBy}
                downVotesBy={downVotesBy}
                isLiked={isCommentLiked}
                isDisliked={isCommentDisliked}
                voteLoadingState={voteLoadingState}
                handleVote={handleVote}
            />
        </div>
    );

}


export const commentItemShape = {
    id: PropTypes.string.isRequired,

    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    authUser: PropTypes.string,
    voteLoadingState: PropTypes.string,
    onVote: PropTypes.func,
}

CommentItem.propTypes = {
    ...commentItemShape,
    threadId: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
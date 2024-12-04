import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import moment from "moment";
export const ThreadCard = ({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  totalComments = 0,
  user,
  authUser,
  upVote,
  downVote,
}) => {
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);


  const handleUpVote = () => {
    if (isThreadLiked) {
      return;
    }

    upVote(id);
  };

  const handleDownVote = () => {
    if (isThreadDisliked) {
      return;
    }

    downVote(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 mb-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.name}
            </span>
            <span className="text-sm text-gray-400 hidden sm:inline">•</span>
            <span className="text-sm text-gray-400 hidden sm:inline">
              {moment(createdAt).fromNow()}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
              Hot 🔥
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-2 dark:text-white text-start">
            {title}
          </h3>
          <div className="text-gray-600 dark:text-gray-300 mb-4 text-start line-clamp-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}/>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">
              {category}
            </span>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-500">
                <ThumbsUp
                  size={16}
                  color={isThreadLiked ? "purple" : "currentColor"}
                  onClick={handleUpVote}
                />
                <span>{upVotesBy.length}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <ThumbsDown
                  size={16}
                  color={isThreadDisliked ? "purple" : "currentColor"}
                  onClick={handleDownVote}
                />
                <span>{downVotesBy.length}</span>
              </button>
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-500 transition-colors ml-auto">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">{totalComments} comments</span>
              <span className="sm:hidden">{totalComments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  // ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number,
  user: userShape.isRequired,
  authUser: PropTypes.string,
};

ThreadCard.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

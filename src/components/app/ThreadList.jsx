import { PropTypes } from "prop-types";
import { ThreadCard, threadItemShape } from "./ThreadCard";
const ThreadList = ({ threads, upVote, downVote }) => {
  return (
    <div className="thread-list mt-10 md:mt-0">
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;

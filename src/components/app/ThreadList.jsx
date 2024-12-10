import { PropTypes } from "prop-types";
import { ThreadCard, threadItemShape } from "./ThreadCard";
const ThreadList = ({ threads }) => {
  return (
    <div className="thread-list mt-10 md:mt-0">
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          {...thread}
        />
      ))}
    </div>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default ThreadList;

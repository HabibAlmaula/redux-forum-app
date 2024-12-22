import { PropTypes } from 'prop-types';
import { ThreadCard, threadItemShape } from './ThreadCard';
import { useNavigate } from 'react-router';
const ThreadList = ({ threads }) => {
  const navigate = useNavigate();
  return (
    <div className="thread-list mt-10 md:mt-0">
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          {...thread}
          onClick={() => navigate(`/detail-thread/${thread.id}`)}
        />
      ))}
    </div>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default ThreadList;

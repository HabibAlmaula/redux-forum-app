import VoteButton from '@/components/app/VoteButton';
import { requestState } from '@/utils/requestState';

const meta = {
  title: 'Components/VoteButton',
  component: VoteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    upVotesBy: {
      control: 'array',
      description: 'Array of user IDs who upvoted',
    },
    downVotesBy: {
      control: 'array',
      description: 'Array of user IDs who downvoted',
    },
    isLiked: {
      control: 'boolean',
      description: 'Whether the current user has liked',
    },
    isDisliked: {
      control: 'boolean',
      description: 'Whether the current user has disliked',
    },
    voteLoadingState: {
      control: 'select',
      options: Object.values(requestState),
      description: 'Current loading state of the vote action',
    },
    handleVote: {
      action: 'voted',
      description: 'Callback function when vote button is clicked',
    },
  },
};

export default meta;

// Default state
export const Default = {
  args: {
    upVotesBy: ['user1', 'user2'],
    downVotesBy: ['user3'],
    isLiked: false,
    isDisliked: false,
    voteLoadingState: requestState.idle,
  },
};

// Liked state
export const Liked = {
  args: {
    upVotesBy: ['user1', 'user2', 'currentUser'],
    downVotesBy: ['user3'],
    isLiked: true,
    isDisliked: false,
    voteLoadingState: requestState.idle,
  },
};

// Disliked state
export const Disliked = {
  args: {
    upVotesBy: ['user1', 'user2'],
    downVotesBy: ['user3', 'currentUser'],
    isLiked: false,
    isDisliked: true,
    voteLoadingState: requestState.idle,
  },
};

// Loading state
export const Loading = {
  args: {
    upVotesBy: ['user1', 'user2'],
    downVotesBy: ['user3'],
    isLiked: false,
    isDisliked: false,
    voteLoadingState: requestState.loading,
  },
};

// Many votes
export const ManyVotes = {
  args: {
    upVotesBy: Array.from({ length: 99 }, (_, i) => `user${i}`),
    downVotesBy: Array.from({ length: 50 }, (_, i) => `downvoter${i}`),
    isLiked: false,
    isDisliked: false,
    voteLoadingState: requestState.idle,
  },
};

// No votes
export const NoVotes = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
    isLiked: false,
    isDisliked: false,
    voteLoadingState: requestState.idle,
  },
};

// Interactive example
export const Interactive = () => {
  const users = Array.from({ length: 5 }, (_, i) => `user${i + 1}`);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default State</h3>
        <VoteButton
          upVotesBy={users.slice(0, 2)}
          downVotesBy={users.slice(2, 3)}
          handleVote={(e, type) => alert(`Voted ${type}`)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Liked State</h3>
        <VoteButton
          upVotesBy={[...users.slice(0, 2), 'currentUser']}
          downVotesBy={users.slice(2, 3)}
          isLiked={true}
          handleVote={(e, type) => alert(`Voted ${type}`)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disliked State</h3>
        <VoteButton
          upVotesBy={users.slice(0, 2)}
          downVotesBy={[...users.slice(2, 3), 'currentUser']}
          isDisliked={true}
          handleVote={(e, type) => alert(`Voted ${type}`)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <VoteButton
          upVotesBy={users.slice(0, 2)}
          downVotesBy={users.slice(2, 3)}
          voteLoadingState={requestState.loading}
          handleVote={(e, type) => alert(`Voted ${type}`)}
        />
      </div>
    </div>
  );
};
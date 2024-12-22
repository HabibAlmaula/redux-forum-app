import React from 'react';
import { fn } from '@storybook/test';
import { ThreadCard } from '@/components/app/ThreadCard';
import { requestState } from '@/utils/requestState';

const sampleUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe',
};

// This is your default configuration
const meta = {
  title: 'Components/ThreadCard',
  component: ThreadCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onVote: { action: 'voted' }
  },
  decorators: [(Story) => React.createElement('div', { className: 'max-w-2xl w-full' }, React.createElement(Story))],
  tags: ['autodocs'],
};

export default meta;

// Default story
export const Default = {
  args: {
    id: 'thread-1',
    title: 'Understanding React Hooks in 2024',
    body: '<p>React Hooks have revolutionized how we write React components...</p>',
    category: 'react',
    createdAt: '2024-03-22T10:00:00.000Z',
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: [],
    totalComments: 42,
    user: sampleUser,
    authUser: 'user-1',
    onVote: fn(),
    voteLoadingState: requestState.idle,
  }
};

// Loading state story
export const Loading = {
  args: {
    ...Default.args,
    voteLoadingState: requestState.loading,
  }
};

// Upvoted state story
export const Upvoted = {
  args: {
    ...Default.args,
    upVotesBy: ['user-1', 'user-2', 'user-3'],
  }
};

// Downvoted state story
export const Downvoted = {
  args: {
    ...Default.args,
    downVotesBy: ['user-1'],
  }
};

// Full content story
export const FullContent = {
  args: {
    ...Default.args,
    showFullBody: true,
    body: `
      <h2>Full Article Content</h2>
      <p>This is a complete article with multiple paragraphs...</p>
      <h3>Key Points</h3>
      <ul>
        <li>First important point</li>
        <li>Second key concept</li>
        <li>Third crucial aspect</li>
      </ul>
    `
  }
};

// Dark mode story
export const DarkMode = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) =>
      React.createElement('div',
        {
          className: 'dark p-4 bg-gray-900',
        },
        React.createElement('div',
          {
            className: 'max-w-2xl w-full',
          },
          React.createElement(Story)
        )
      )
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  }
};

// Many votes story
export const ManyVotes = {
  args: {
    ...Default.args,
    upVotesBy: Array.from({ length: 50 }, (_, i) => `user-${i}`),
    downVotesBy: Array.from({ length: 20 }, (_, i) => `user-${i + 100}`),
  }
};

// No comments story
export const NoComments = {
  args: {
    ...Default.args,
    totalComments: 0,
  }
};
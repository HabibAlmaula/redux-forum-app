import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
const ThreadCard = ({ thread }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={thread.owner.avatar}
            alt={thread.owner.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {thread.owner.name}
          </span>
          <span className="text-sm text-gray-400 hidden sm:inline">•</span>
          <span className="text-sm text-gray-400 hidden sm:inline">
            {new Date(thread.createdAt).toLocaleDateString()}
          </span>
          {thread.isHot && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
              Hot 🔥
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 dark:text-white text-start">
          {thread.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-start">
          {thread.body}
        </p>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">
            {thread.category}
          </span>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-500">
              <ThumbsUp size={16} />
              <span>{thread.upVotesBy.length}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500">
              <ThumbsDown size={16} />
              <span>{thread.downVotesBy.length}</span>
            </button>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-500 transition-colors ml-auto">
            <MessageSquare size={16} />
            <span className="hidden sm:inline">
              {thread.totalComments} comments
            </span>
            <span className="sm:hidden">{thread.totalComments}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ThreadCard;

import moment from 'moment';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { ThumbsUp } from 'lucide-react';
import { ThumbsDown } from 'lucide-react';
export const CommentItem = ({ id, avatar, name, createdAt, content }) => {
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
            <div className="flex items-center gap-2 text-gray-400">
                <button className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>12</span>
                </button>
                <button className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span>2</span>
                </button>
            </div>
        </div>
    );

}


export const commentItemShape = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

CommentItem.propTypes = {
    ...commentItemShape,
}
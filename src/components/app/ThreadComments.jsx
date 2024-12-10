
import PropTypes from 'prop-types';
import { CommentItem, commentItemShape } from './CommentItem';
import { Card, CardContent } from '../ui/card';
export const ThreadComments = ({ comments }) => {
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
                                avatar={comment.owner.avatar}
                                name={comment.owner.name}
                            />
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

ThreadComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired
}
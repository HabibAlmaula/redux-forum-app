
import PropTypes from 'prop-types';
import { CommentItem, commentItemShape } from './CommentItem';
import { Card, CardContent } from '../ui/card';
export const ThreadComments = ({ comments }) => {
    return (
        <div>
            <p className="text-2xl font-bold mb-5 mt-5">Comments({comments.length})</p>
            <Card>
                <CardContent>
                    {comments.map((comment) => {
                        return (
                            <CommentItem {...comment} key={comment.id} avatar={comment.owner.avatar} name={comment.owner.name} />
                        );
                    })}
                </CardContent>
            </Card>

        </div>
    );
}

ThreadComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired
}
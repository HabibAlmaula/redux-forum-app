import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CommentInput = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (

        <Card className="shadow-lg">
            <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full min-h-[100px] resize-none"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!comment.trim()}>
                            Post Comment
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    );
};

CommentInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default CommentInput;
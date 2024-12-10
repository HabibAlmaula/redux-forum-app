import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { requestState } from "@/utils/requestState";
import { useInput } from "@/hooks/useInput";

const CommentInput = ({ onSubmit }) => {
  const [comment, onChange, setComment] = useInput("");
  const loadingState = useSelector((state) => state.comment.requestState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={onChange}
            className="w-full min-h-[100px] resize-none"
            disabled={loadingState === requestState.loading}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!comment.trim() || loadingState == requestState.loading}
            >
              {loadingState === requestState.loading
                ? "Posting..."
                : "Post Comment"}
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

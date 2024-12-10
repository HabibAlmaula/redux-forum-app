import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { requestState } from "@/utils/requestState";
import { ThumbsUp, ThumbsDown } from "lucide-react";


const VoteButton = ({upVotesBy = [], downVotesBy = [], isLiked = false, isDisliked = false, voteLoadingState, handleVote}) => {
    return (
        <div className="flex items-center gap-4">
            <motion.button
                className={`flex items-center gap-1 text-gray-500 ${voteLoadingState === requestState.loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => handleVote(e, 'up')}
                whileTap={voteLoadingState !== requestState.loading ? { scale: 0.95 } : {}}
                disabled={voteLoadingState === requestState.loading}
            >
                <motion.div
                    animate={isLiked ? {
                        scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ duration: 0.2 }}
                >
                    <ThumbsUp
                        size={16}
                        color={isLiked ? "purple" : "currentColor"}
                        className={`transition-opacity duration-200 ${voteLoadingState === requestState.loading ? 'opacity-50' : 'opacity-100'}`}
                    />
                </motion.div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={upVotesBy.length}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {upVotesBy.length}
                    </motion.span>
                </AnimatePresence>
            </motion.button>

            <motion.button
                className={`flex items-center gap-1 text-gray-500 ${voteLoadingState === requestState.loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => handleVote(e, 'down')}
                whileTap={voteLoadingState !== requestState.loading ? { scale: 0.95 } : {}}
                disabled={voteLoadingState === requestState.loading}
            >
                <motion.div
                    animate={isDisliked ? {
                        scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ duration: 0.2 }}
                >
                    <ThumbsDown
                        size={16}
                        color={isDisliked ? "purple" : "currentColor"}
                        className={`transition-opacity duration-200 ${voteLoadingState === requestState.loading ? 'opacity-50' : 'opacity-100'}`}
                    />
                </motion.div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={downVotesBy.length}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {downVotesBy.length}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </div>
    );
}

VoteButton.propTypes = {
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
    isLiked: PropTypes.bool,
    isDisliked: PropTypes.bool,
    voteLoadingState: PropTypes.string,
    handleVote: PropTypes.func,
};

export default VoteButton;
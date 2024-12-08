import { BaseHome } from "@/components/app/BaseHome";
import { ThreadCard } from "@/components/app/ThreadCard";
import { asyncFetchThreadDetail } from "@/states/thread/action";
import { requestState } from "@/utils/requestState";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThreadComments } from "@/components/app/ThreadComments";
import CommentInput from "@/components/app/CommentInput";


export const DetailTrhead = () => {
    const { id } = useParams();
    const thread = useSelector((state) => state.thread);

    const authUser = useSelector((state) => state.authUser);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncFetchThreadDetail(id));
    }, [dispatch, id]);


    const onUpVote = () => {
        console.log("Upvoted");
    };

    const onDownVote = () => {
        console.log("Downvoted");
    }

    const handleCommentSubmit = (content) => {
        // TODO: Implement comment submission logic
        console.log("New comment:", content);
    };



    const renderThreadDetail = () => {
        switch (thread.requestState) {
            case requestState.loading:
                return <div>Loading...</div>;
            case requestState.success:
                const threadDetail = {
                    ...thread.thread,
                    user: thread.thread.owner,
                    authUser: authUser.authUser.id,
                };
                return (
                    <div className="flex flex-col">
                        <ThreadCard key={id}
                            {...threadDetail}
                            showFullBody={true}
                            totalComments={threadDetail.comments.length}
                            downVote={() => onDownVote()}
                            upVote={() => onUpVote()}
                        />
                        <CommentInput onSubmit={handleCommentSubmit} />
                        <ThreadComments comments={threadDetail.comments} />
                    </div>
                );
            case requestState.failure:
                return <div>Error loading content</div>;
            default:
                return null;
        }
    };


    return (
        <BaseHome>
            {renderThreadDetail()}
        </BaseHome>
    );
}
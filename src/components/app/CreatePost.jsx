import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useInput } from "@/hooks/useInput";
import { Textarea } from "../ui/textarea";
import PropTypes from "prop-types";
import { useState } from "react";

export const CreatePostInput = ({ authUser, handlePostSubmit, isLoading = false }) => {
    const [postTitle, onChangePostTitle, setPostTitle] = useInput("");
    const [postBody, onChangePostBody, setPostBody] = useInput("");
    const [category, setCategory] = useState("General");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postBody.trim() && postTitle.trim()) {
            handlePostSubmit(postTitle, postBody, category);
            setPostTitle("");
            setPostBody("");
        }
    }

    return (
        <Card className="mb-6 mt-5 md:mt-0">
            <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                    <img
                        src={authUser.authUser.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <form onSubmit={handleSubmit}>
                            <Input
                                placeholder="Thread title"
                                className="mb-3 bg-gray-50 dark:bg-gray-700"
                                value={postTitle}
                                onChange={onChangePostTitle}
                                disabled={isLoading}
                            />
                            <Textarea
                                placeholder="Thread content"
                                className="mb-3 bg-gray-50 dark:bg-gray-700"
                                value={postBody}
                                onChange={onChangePostBody}
                                disabled={isLoading}
                            />
                            <div className="flex flex-wrap gap-2 sm:justify-between sm:items-center">
                                <div className="flex gap-2 order-1 sm:order-1">
                                    {["General", "Tech", "Design"].map((tag) => (
                                        <Button
                                            type="button"
                                            key={tag}
                                            variant="outline"
                                            size="sm"
                                            className={`${category === tag ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "text-gray-600 dark:text-gray-400"} order-1 sm:order-2`}
                                            disabled={isLoading || !postBody.trim() || !postTitle.trim()}
                                            onClick={() => {
                                                setCategory(tag);
                                                console.log(category);
                                            }}
                                        >
                                            {tag}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !postBody.trim() || !postTitle.trim()}
                                    className="w-full sm:w-auto order-2 sm:order-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-2 sm:mb-0">
                                    {isLoading ? "Posting..." : "Post Thread"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

CreatePostInput.propTypes = {
    authUser: PropTypes.object.isRequired,
    handlePostSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
}

import { createComment, findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export const createCommentService = async (content, userId, onModel, commentableId) => {
    try {
        if(onModel === "Post") {
            // comment is being made on a post and commentable id is the post id

            // 1. Check if post exists or not

            const post = await findPostById(commentableId);
            if(!post){
                throw {
                    message: "Post not found",
                    status: 404
                }
            }

            // 2. Create a comment
            const newComment = await createComment(content, userId, onModel, commentableId);

            // 3. Add comment to post
            post.comments.push(newComment._id);
            
            // 4. Save post
            await post.save();

            return newComment;
        } else if(onModel === "Comment") {
            const parentComment = await findCommentById(commentableId);
            if(!parentComment){
                throw {
                    message: "Comment not found",
                    status: 404
                }
            }

            // 2. Create a comment
            const newComment = await createComment(content, userId, onModel, commentableId);

            // 3. Add comment to post
            parentComment.replies.push(newComment._id);
            
            // 4. Save post
            await parentComment.save();

            return newComment;
        }
    } catch (error) {
        
    }
}

const fetchCommentParent = async (onModel, commentableId) => {
    try {
        let parent;
        if(onModel === "Post") {
            parent = await findPostById(commentableId);
        } else if(onModel === "Comment") {
            parent = await findCommentById(commentableId);
        }

        return parent;
    } catch (error) {
        console.log(error);
    }
}
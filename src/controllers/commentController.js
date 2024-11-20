import { createCommentService } from "../services/commentService.js";

export async function createComment(req, res) {
    const content = req.content;
    const userDetails = req.user;

    if(!content){
        return res.status(400).json({
            success: false,
            message: 'content is required'
        });
    }

    try {
        const comment = await createCommentService({
            content: content,
            user: userDetails._id
        })

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: comment
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating comment',
            error: error.message,
        });
    }
}
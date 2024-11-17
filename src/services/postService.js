import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById, updatePostById } from "../repositories/postRepository.js";
export const createPostService = async (createPostObject) => {
    // 1. Take the image of the post and upload on AWS

    // 2. Get the url of the image from the aws response
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    const user = createPostObject.user;
    // 3. Create a post with caption and the image url in the db using repository
    const post = await createPost(caption, image, user);
    // 4. Return the post object
    return post;
}

export const getAllPostService = async (offset, limit) => {
    const allPost = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();
    
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        allPost, totalPages, totalDocuments
    }
}

export const getPostByIdService = async (getPostId) => {
    const id = getPostId.id;
    const post = await findPostById(id);

    return post;
}

export const updatePostByIdService = async (UpdatePostObject) => {
    //HW: try to implement the logic to delete old image from aws in case of update of post image
    const id = UpdatePostObject.id;
    const caption = UpdatePostObject.caption;

    const updatePost = await updatePostById(id, caption, {new: true});
    
    return updatePost;
}

export const deletePostByIdService = async (deletePostObject) => {
    const id = deletePostObject.id;

    const deletePost = await deletePostById(id);

    return deletePost;
}
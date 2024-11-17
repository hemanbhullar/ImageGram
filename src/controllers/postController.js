import { createPostService, deletePostByIdService, getAllPostService, getPostByIdService, updatePostByIdService } from "../services/postService.js";

import { v2 as cloudinary } from 'cloudinary';

//AWS CREATEPOST

// export async function createPost(req, res) {
//     console.log(req.file); // req.file.location
//     //call the service layer function
//     if(!req.file || !req.file.location) {
//         return res.status(400).json({
//             success: false,
//             message: 'Image is required'
//         })
//     }
//     const post = await createPostService({
//         caption: req.body.caption,
//         image: req.file.location
//     });
//     return res.status(201).json({
//         success: true,
//         message: 'Post created successfully',
//         data: post
//     });
// }
export async function createPost(req, res) {
    const userDetails = req.user;
    // console.log(userDetails);
    console.log(req.file); // Log the file object

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Image is required'
        });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const post = await createPostService({
            caption: req.body.caption,
            image: result.secure_url,
            user: userDetails._id
        });

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message,
        });
    }
}


// /api/v1/posts?limit=10&offset=0
export async function getAllPost(req, res) {

    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPosts = await getAllPostService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "All posts fetched successfully",
            date: paginatedPosts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// write an api to list all the posts in a paginated form


export async function getPostById(req, res) {

    const postById = await getPostByIdService({ id: req.params.id });

    return res.json({
        success: true,
        message: 'Get Post By Id',
        data: postById
    })

}

export async function updatePostByid(req, res) {
    try {
        const postById = await updatePostByIdService({ id: req.params.id, caption: req.body.caption });

        return res.status(200).json({
            success: true,
            message: 'Update Post By Id',
            data: postById
        })

    } catch (error) {

    }

}

export async function deletePostByid(req, res) {
    try {
        const response = await deletePostByIdService({ id: req.params.id });

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.json({
            success: true,
            message: 'Post is deleted successfully',
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
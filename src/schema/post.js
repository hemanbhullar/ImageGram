import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 5
    },
    image:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
}, {timestamps:  true});

const Post = mongoose.model("Post", postSchema);

export default Post;
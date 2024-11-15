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
    // Like :{
    //     type: Number
    // },
    // Comment:{
    //     type: String
    // }
}, {timestamps:  true});

const Post = mongoose.model("Post", postSchema);

export default Post;
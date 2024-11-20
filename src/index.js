import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './utils/swaggerOptions.js';
import ip from 'ip';
import { rateLimit } from 'express-rate-limit';

// import { createPost, deletePostByid, getAllPost, getPostById, updatePostByid } from './controllers/postController.js';
// import { s3uploader } from './config/multerConfig.js';

const PORT = 3000; // port

const swaggerDocs = swaggerJSDoc(options);

const app = express(); //create express app server instance

const limiter = rateLimit({
    windowMs: 0.5*60*1000, //30 seconds
    max: 5 // limit each IP to 5 requests per windowMS
});

app.use(limiter);

const upload = multer();

app.use(express.json()); //start converting binary data into a JSON
app.use(express.text());
app.use(express.urlencoded());

// app.use('/posts', postRouter); // If the url has /posts, then use the postRouter to handle the request

// app.use('/users', userRouter); // If the URL starts with /users, then use the userRouter to handle the request

app.use('/api', apiRouter); //If the url start with /api then request is forwarded to the apiRouter

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    return res.send('Home')
});

// app.get('/ping/:name', (req, res) => {
//     console.log(req.query);
//     console.log(req.body);
//     // const name = req.params.name; // req.params -> { name: 'value' }
//     return res.json({message: 'pong'});
// });

app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    // const name = req.params.name; // req.params -> { name: 'value' }
    const ipaddr = ip.address();
    return res.json({message: 'pong' + ipaddr});
});

// app.post('/posts', s3uploader.single('image') , createPost);
// //Read all posts, delete post, update post, read single post

// app.get('/all-posts', getAllPost);

// app.get('/posts/:id', getPostById);

// app.put('/update-post/:id', updatePostByid);

// app.delete('/delete/:id', deletePostByid);

// function m1(req, res, next) {
//     console.log('m1');
//     next();
// }

// function m2(req, res, next) {
//     console.log('m2');
//     next();
// }

// function m3(req, res, next) {
//     console.log('m3');
//     next();
// }

// app.post('/posts',m1, m2, m3, createPost); // Or app.post('/posts',[m1, m2, m3], createPost);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


// Figure out alternative to store JWT tokens on the client side

// and implement a solution storing it with different alternatives

// Try to deploy both the frontend and backend and see if the jwt token based is working or not

// Build your own real time polling app
// Allow user to create polls
// Allow real time updates and visualisation as votes are added
// For visualisation you can use some charts
// People can bookmark the poll, so that they can come up later and see what all poles they participated in.
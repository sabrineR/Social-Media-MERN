const express = require('express');
const { createPost, getAllPost,  updatePost,deletePost, likePost, UnlikePost, addComment, editComment, deleteComment, getPostByID } = require('../controllers/post.controller');

const router = express.Router();


router.post('/',createPost);
router.get('/',getAllPost );
router.get('/:_id',getPostByID)
router.put('/:_id',updatePost);
router.delete('/:_id',deletePost);

// router.get('/:posterId',getPostByID );



//like et dislike
router.patch('/like_post/:_id',likePost);
router.patch('/unlike_post/:_id',UnlikePost);

// comment post : 
 router.patch('/comment_post/:_id',addComment );
 router.patch('/editComment_post/:_id',editComment);
 router.patch('/deleteComment_post/:_id',deleteComment);

module.exports = router;
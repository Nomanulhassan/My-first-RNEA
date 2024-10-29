const express = require('express')
const { requireSignIn } = require('../controlls/userController')
const { createPostController, getAllpostsController, getUserPostsController, deletPostController, updatePostController } = require('../controlls/postController')

const router = express.Router()

//create post
router.post('/create-post', requireSignIn, createPostController)

//get all posts
router.get('/get-all-post',getAllpostsController)
//get user post
router.get('/get-user-post',requireSignIn, getUserPostsController)
//delete
router.delete('/delete-post/:id',requireSignIn,deletPostController)
//update
router.put('/update-post/:id',requireSignIn,updatePostController)

module.exports = router
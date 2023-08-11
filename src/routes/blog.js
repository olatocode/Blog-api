/** @format */

const express = require('express');
const router = express.Router();

const { createPost, viewPost, updatePost, deletePost } = require('../controllers/blog');

// post routes 
router.post('/posts', createPost);
router.get('/posts', viewPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);


module.exports = router;

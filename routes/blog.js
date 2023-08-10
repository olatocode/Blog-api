/** @format */

const express = require('express');
const router = express.Router();

const { createPost, getPost } = require('../controllers/blog');

// post routes 
router.post('/posts', createPost);
router.get('/posts', getPost);


module.exports = router;
